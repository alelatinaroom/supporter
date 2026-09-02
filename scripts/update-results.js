const cheerio = require('cheerio');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const BASE = resolve(__dirname, '..', 'js');
const RESULTS_PATH = resolve(BASE, 'season_results.json');
const CLASS_PATH = resolve(BASE, 'classifica.json');

const CLASSIFICA_URL = 'https://www.repubblica.it/sport/dirette/calcio/serie-c-2026/classifica/';
const CALENDARIO_URL = 'https://www.repubblica.it/sport/dirette/calcio/serie-c-2026/calendario/latina-b70q3vll5yy6eou2cvsh47f84/';

const MONTHS = {
  'gennaio': 1, 'febbraio': 2, 'marzo': 3, 'aprile': 4, 'maggio': 5,
  'giugno': 6, 'luglio': 7, 'agosto': 8, 'settembre': 9, 'ottobre': 10,
  'novembre': 11, 'dicembre': 12,
};

const TEAM_CLASS_MAP = {
  'Forlì': 'forli', 'Forli': 'forli', 'Ravenna': 'ravenna',
  'Vado': 'vado', 'Grosseto': 'grosseto', 'Perugia': 'perugia',
  'Reggiana': 'reggiana', 'Livorno': 'livorno', 'Spezia': 'spezia',
  'Monterosi': 'monterosi', 'Campobasso': 'campobasso',
  'Torres': 'torres', 'Pescara': 'pescara', 'Atalanta II': 'atalantau23',
  'Atalanta U23': 'atalantau23', 'Pineto': 'pineto',
  'Sambenedettese': 'sambenedettese', 'Vis Pesaro': 'vispesaro',
  'Latina': 'latina', 'Pianese': 'pianese', 'Ostia Mare': 'ostiamare',
  'Gubbio': 'gubbio',
};

function normalizeTeamName(name) {
  name = name.trim();
  if (name === 'Atalanta II') return 'Atalanta U23';
  return name;
}

function teamClass(name) {
  const n = normalizeTeamName(name);
  return TEAM_CLASS_MAP[n] || n.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function fetchHTML(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'it-IT,it;q=0.9',
    },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`Fetch ${url} -> ${res.status}`);
  return res.text();
}

/* --------------- CLASSIFICA --------------- */

function parseClassifica(html) {
  const $ = cheerio.load(html);
  const teams = [];

  // Girone B table is the one containing both Forlì and Latina
  let table = null;
  $('table.as21-classifica-table').each((i, el) => {
    const text = $(el).text();
    if (text.includes('Forlì') && text.includes('Latina')) table = $(el);
  });

  if (!table) throw new Error('Girone B classifica table not found');

  table.find('tr.as21-classifica-table-tr').each((i, row) => {
    const cells = $(row).find('td');
    if (cells.length < 7) return;
    const team = normalizeTeamName(cells.eq(0).text().trim());
    if (!team) return;
    const pts = parseInt(cells.eq(1).text().trim());
    const g = parseInt(cells.eq(2).text().trim());
    const v = parseInt(cells.eq(3).text().trim());
    const n = parseInt(cells.eq(4).text().trim());
    const p = parseInt(cells.eq(5).text().trim());
    const gf = parseInt(cells.eq(6).text().trim());
    const gs = parseInt(cells.eq(7).text().trim());
    teams.push({ team, pts, g, v, n, p, gf, gs, dr: gf - gs });
  });

  teams.sort((a, b) => b.pts - a.pts || b.dr - a.dr || b.gf - a.gf);
  return teams.map((t, i) => ({
    pos: i + 1,
    team: t.team,
    teamClass: teamClass(t.team),
    pts: t.pts, g: t.g, v: t.v, n: t.n, p: t.p,
    gf: t.gf, gs: t.gs, dr: t.dr,
    penalty: 0,
  }));
}

/* --------------- CALENDARIO --------------- */

function parseCalendar(html) {
  const $ = cheerio.load(html);
  const results = [];

  $('div.as21-dashboard-card').each((i, card) => {
    const $card = $(card);
    const teams = $card.find('p.as21-dashboard-team-name');
    if (teams.length < 2) return;

    const homeTeam = teams.eq(0).text().trim();
    const awayTeam = teams.eq(1).text().trim();
    const isLatina = (homeTeam === 'Latina') || (awayTeam === 'Latina');
    if (!isLatina) return;

    // Score
    const scoreDiv = $card.find('div.as21-dashboard-score');
    const scoreText = scoreDiv.text().replace(/\s+/g, ' ').trim();
    const scoreMatch = scoreText.match(/(\d+)\s+(\d+)/);

    // Status
    const cardClass = $card.attr('class') || '';
    const isFinished = cardClass.includes('fulltime');

    // Date
    const dateText = $card.text();
    const dateMatch = dateText.match(/(\d{1,2})\/(\d{1,2})/);

    if (!isFinished) return; // only process played matches
    if (!scoreMatch || !dateMatch) return;

    const day = dateMatch[1].padStart(2, '0');
    const month = dateMatch[2].padStart(2, '0');
    const year = (month === '12') ? '2027' : '2026';
    const date = `${day}/${month}/${year}`;

    const isLatinaHome = homeTeam === 'Latina';
    const opponent = normalizeTeamName(isLatinaHome ? awayTeam : homeTeam);
    const latinaScore = isLatinaHome ? parseInt(scoreMatch[1]) : parseInt(scoreMatch[2]);
    const oppScore = isLatinaHome ? parseInt(scoreMatch[2]) : parseInt(scoreMatch[1]);

    let result;
    if (latinaScore > oppScore) result = 'V';
    else if (latinaScore < oppScore) result = 'P';
    else result = 'N';

    results.push({
      date,
      time: '',
      opponent,
      opponentClass: teamClass(opponent),
      isHome: isLatinaHome,
      score: `${latinaScore}-${oppScore}`,
      latinaScore,
      opponentScore: oppScore,
      result,
    });
  });

  return results;
}

/* --------------- FULL CALENDAR for scheduling --------------- */

function parseFullSchedule(html) {
  const $ = cheerio.load(html);
  const results = [];

  $('div.as21-calendar-card').each((i, card) => {
    const $card = $(card);

    // Header: "Domenica 23 Agosto 2026 - 17:00 - Gruppo B"
    const header = $card.find('div.as21-calendar-card-header').text();
    const timeMatch = header.match(/(\d{1,2}):(\d{2})/);
    const dateMatch = header.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/i);
    if (!dateMatch) return;

    const day = parseInt(dateMatch[1]);
    const monthName = dateMatch[2].toLowerCase();
    const year = parseInt(dateMatch[3]);

    // Teams: home is as21-calendar-card-team-parent, away is as21-calendar-card-away-team
    const homeTeam = $card.find('div.as21-calendar-card-body > div.as21-calendar-card-team-parent').first().find('span').text().trim();
    const awayTeam = $card.find('div.as21-calendar-card-away-team span').first().text().trim();
    if (!homeTeam || !awayTeam) return;

    const isLatinaHome = homeTeam === 'Latina';
    const isLatinaAway = awayTeam === 'Latina';
    if (!isLatinaHome && !isLatinaAway) return;

    const opponent = normalizeTeamName(isLatinaHome ? awayTeam : homeTeam);

    // Status: played if "Fine" present
    const isPlayed = /fine/i.test($card.find('div.as21-calendar-card-progress').text());

    // Score: two as21-calendar-card-score divs (home, away)
    let latinaScore = 0, oppScore = 0, result = 'T';
    if (isPlayed) {
      const scores = $card.find('div.as21-calendar-card-score').map((_, el) => parseInt($(el).text().trim())).get().filter(n => !isNaN(n));
      if (scores.length >= 2) {
        const home = scores[0];
        const away = scores[1];
        latinaScore = isLatinaHome ? home : away;
        oppScore = isLatinaHome ? away : home;
        if (latinaScore > oppScore) result = 'V';
        else if (latinaScore < oppScore) result = 'P';
        else result = 'N';
      }
    }

    results.push({
      date: `${String(day).padStart(2, '0')}/${String(monthIdx(monthName)).padStart(2, '0')}/${year}`,
      time: timeMatch ? `${timeMatch[1]}:${timeMatch[2]}` : '',
      opponent,
      opponentClass: teamClass(opponent),
      isHome: isLatinaHome,
      score: `${latinaScore}-${oppScore}`,
      latinaScore,
      opponentScore: oppScore,
      result,
    });
  });

  return results;
}

function monthIdx(name) {
  return MONTHS[name] || 1;
}

/* --------------- MAIN --------------- */

async function main() {
  console.log('=== Serie C data updater (La Repubblica) ===');

  // 1. Classifica
  try {
    console.log('\n[1/2] Fetching classifica...');
    const html = await fetchHTML(CLASSIFICA_URL);
    const newClass = parseClassifica(html);
    if (newClass.length >= 18) {
      writeFileSync(CLASS_PATH, JSON.stringify(newClass, null, 2) + '\n');
      console.log(`Updated classifica.json (${newClass.length} teams). Latina: ` +
        (newClass.find(t => t.team === 'Latina') ? `pos ${newClass.find(t => t.team === 'Latina').pos}, ${newClass.find(t => t.team === 'Latina').pts} pts` : 'N/A'));
    } else {
      console.log(`Only ${newClass.length} teams parsed - skipping classifica update`);
    }
  } catch (e) {
    console.error('Classifica failed:', e.message);
  }

  // 2. Risultati
  try {
    console.log('\n[2/2] Fetching calendario...');
    const html = await fetchHTML(CALENDARIO_URL);
    const schedule = parseFullSchedule(html);
    console.log(`Parsed ${schedule.length} Latina calendar cards`);

    if (schedule.length >= 30) {
      writeFileSync(RESULTS_PATH, JSON.stringify(schedule, null, 2) + '\n');
      const played = schedule.filter(m => m.result !== 'T');
      console.log(`Updated season_results.json (${schedule.length} matches, ${played.length} played)`);
    } else {
      console.log(`Only ${schedule.length} matches parsed - skipping results update`);
    }
  } catch (e) {
    console.error('Calendario failed:', e.message);
  }

  console.log('\n=== Done ===');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
