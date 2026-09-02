import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE = resolve(process.cwd(), 'js');
const RESULTS_PATH = resolve(BASE, 'season_results.json');
const CLASS_PATH = resolve(BASE, 'classifica.json');

const REPAIR_CLASSIFICA_URL = 'https://www.repubblica.it/sport/dirette/calcio/serie-c-2026/classifica/';
const REPAIR_CALENDAR_URL = 'https://www.repubblica.it/sport/dirette/calcio/serie-c-2026/calendario/latina-b70q3vll5yy6eou2cvsh47f84/';

const GIRONE_B_TEAMS = new Set([
  'Atalanta II','Atalanta U23','Campobasso','Forlì','Grosseto','Gubbio',
  'Latina','Livorno','Monterosi','Ostia Mare','OstiaMare','Perugia','Pescara',
  'Pianese','Pineto','Ravenna','Reggiana','Sambenedettese','Spezia',
  'Torres','Vado','Vis Pesaro','VisPesaro'
]);

const TEAM_NAME_MAP = {
  'Atalanta II': 'Atalanta U23',
  'Atalanta II ': 'Atalanta U23',
  'Ostia Mare': 'Ostia Mare',
  'Vis Pesaro': 'Vis Pesaro',
  'Sambenedettese': 'Sambenedettese',
};

function isGironeB(name) {
  if (GIRONE_B_TEAMS.has(name)) return true;
  for (const k of GIRONE_B_TEAMS) {
    if (name.includes(k) || k.includes(name)) return true;
  }
  return false;
}

function normalizeTeamName(raw) {
  const n = raw.trim().replace(/\s+/g, ' ');
  return TEAM_NAME_MAP[n] || n;
}

function extractTeamClass(name) {
  const n = normalizeTeamName(name).toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  const map = {
    'atalantau23': 'atalantau23', 'atalantaii': 'atalantau23',
    'campobasso': 'campobasso', 'forli': 'forli', 'forlì': 'forli',
    'grosseto': 'grosseto', 'gubbio': 'gubbio',
    'latina': 'latina', 'livorno': 'livorno',
    'monterosi': 'monterosi', 'ostiamare': 'ostiamare',
    'perugia': 'perugia', 'pescara': 'pescara',
    'pianese': 'pianese', 'pineto': 'pineto',
    'ravenna': 'ravenna', 'reggiana': 'reggiana',
    'sambenedettese': 'sambenedettese', 'spezia': 'spezia',
    'torres': 'torres', 'vado': 'vado',
    'vispesaro': 'vispesaro', 'vispesaro': 'vispesaro',
  };
  return map[n] || n.replace(/[^a-z0-9]/g, '');
}

async function fetchHTML(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'it-IT,it;q=0.9',
    }
  });
  if (!res.ok) throw new Error(`Fetch ${url} failed: ${res.status}`);
  return res.text();
}

/* --------------- CLASSIFICA PARSER --------------- */

function parseClassifica(html) {
  const teams = [];
  // Extract text content, split by lines for pattern matching
  const text = html.replace(/<[^>]+>/g, '\n')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/\s+/g, ' ')
                    .split('\n')
                    .map(l => l.trim())
                    .filter(l => l.length > 0);

  let inGironeB = false;
  let lineIdx = 0;

  for (let i = 0; i < text.length; i++) {
    const line = text[i];

    if (/GIRONE\s*B/i.test(line) && /classifica/i.test(html.substring(html.indexOf(line) - 200, html.indexOf(line)))) {
      inGironeB = true;
      continue;
    }

    if (inGironeB && /GIRONE\s*C/i.test(line)) {
      inGironeB = false;
      break;
    }

    if (!inGironeB) continue;

    // Try to parse: "Squadra Pt PG V N P GF GS"
    // Pattern: team name followed by numbers
    const match = line.match(/^([A-Za-zÀ-ú\s\.\-]+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/);
    if (match) {
      const [, team, pts, pg, v, n, p, gf, gs] = match;
      const teamName = normalizeTeamName(team);
      if (isGironeB(teamName) || isGironeB(team)) {
        teams.push({
          team: teamName,
          pts: +pts, g: +pg, v: +v, n: +n, p: +p, gf: +gf, gs: +gs,
          dr: +gf - +gs
        });
      }
    }
  }

  // Sort by pts, then dr, then gf
  teams.sort((a, b) => b.pts - a.pts || b.dr - a.dr || b.gf - a.gf);
  return teams.map((t, i) => ({
    pos: i + 1,
    team: t.team,
    teamClass: extractTeamClass(t.team),
    pts: t.pts, g: t.g, v: t.v, n: t.n, p: t.p,
    gf: t.gf, gs: t.gs, dr: t.dr,
    penalty: 0
  }));
}

/* --------------- CALENDAR PARSER --------------- */

function parseCalendar(html) {
  const results = [];
  // Strategy: find all match blocks on the page
  // Each block has: home team, score, away team, date info
  const text = html.replace(/<[^>]+>/g, '\n')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/&amp;/g, '&')
                    .replace(/\s+/g, ' ')
                    .split('\n')
                    .map(l => l.trim())
                    .filter(l => l.length > 0);

  // Find all Italian date patterns: DD/MM or DD/MM/YYYY
  const datePattern = /(\d{1,2}\/\d{1,2}(?:\/\d{4})?)/;
  const timePattern = /(\d{1,2}:\d{2})/;

  for (let i = 0; i < text.length; i++) {
    const line = text[i];

    // Look for date lines with or without year
    const dateMatch = line.match(datePattern);
    if (dateMatch) {
      const dateStr = dateMatch[1];
      const fullDate = dateStr.split('/').length === 2
        ? dateStr + '/2026'
        : dateStr;

      // Look for time nearby
      let time = '';
      for (let j = i + 1; j < Math.min(i + 5, text.length); j++) {
        const tm = text[j].match(timePattern);
        if (tm) { time = tm[1]; break; }
      }

      // Look backwards for score (2 numbers separated by space)
      let score = null;
      let homeTeam = null;
      let awayTeam = null;
      let isFinished = false;

      for (let j = i - 1; j >= Math.max(i - 20, 0); j--) {
        const prev = text[j];
        if (/fine|terminat|finale/i.test(prev)) isFinished = true;
        if (/^\d+\s+\d+$/.test(prev)) {
          const parts = prev.split(/\s+/);
          score = { home: +parts[0], away: +parts[1] };
        }
      }

      if (!score || !isFinished) continue;

      // Teams should be between score and date
      // Home team is before score, away team is after score or in different position
      let homeIdx = -1, scoreIdx = -1, awayIdx = -1;
      for (let j = i - 20; j < i + 5; j++) {
        if (j < 0 || j >= text.length) continue;
        if (text[j] === `${score.home} ${score.away}` || text[j] === `${score.home}`) {
          if (scoreIdx === -1) scoreIdx = j;
        }
      }

      // Find the home team (first team name before score block)
      for (let j = scoreIdx - 1; j >= Math.max(scoreIdx - 10, 0); j--) {
        const t = text[j];
        if (t.length > 2 && !/fine|terminat|^\d|ore|agosto|settembre|ottobre|novembre|dicembre|gennaio|febbraio|marzo|aprile|giugno|luglio/i.test(t)) {
          homeTeam = t;
          homeIdx = j;
          break;
        }
      }

      // Find the away team (after the score block, before the date)
      for (let j = scoreIdx + 2; j < i; j++) {
        const t = text[j];
        if (t.length > 2 && !/fine|terminat|^\d|ore|agosto|settembre|ottobre|novembre|dicembre|gennaio|febbraio|marzo|aprile|giugno|luglio/i.test(t)) {
          awayTeam = t;
          awayIdx = j;
          break;
        }
      }

      if (!homeTeam || !awayTeam) continue;

      // Check if Latina is involved
      const isLatinaHome = /latina/i.test(homeTeam);
      const isLatinaAway = /latina/i.test(awayTeam);

      if (!isLatinaHome && !isLatinaAway) continue;

      const opponent = normalizeTeamName(isLatinaHome ? awayTeam : homeTeam);
      const latinaScore = isLatinaHome ? score.home : score.away;
      const opponentScore = isLatinaHome ? score.away : score.home;

      let result;
      if (latinaScore > opponentScore) result = 'V';
      else if (latinaScore < opponentScore) result = 'P';
      else result = 'N';

      results.push({
        date: fullDate,
        time: time || '',
        opponent,
        opponentClass: extractTeamClass(opponent),
        isHome: isLatinaHome,
        score: `${latinaScore}-${opponentScore}`,
        latinaScore,
        opponentScore,
        result
      });
    }
  }

  return results;
}

/* --------------- MAIN --------------- */

async function main() {
  console.log('Updating results from La Repubblica...');

  // 1. Fetch and parse classifica
  try {
    console.log('Fetching classifica...');
    const classHtml = await fetchHTML(REPAIR_CLASSIFICA_URL);
    const newClass = parseClassifica(classHtml);
    if (newClass.length >= 10) {
      writeFileSync(CLASS_PATH, JSON.stringify(newClass, null, 2) + '\n');
      console.log(`Updated classifica.json (${newClass.length} teams)`);
    } else {
      console.warn(`Classifica only parsed ${newClass.length} teams, skipping update (too few)`);
    }
  } catch (e) {
    console.error('Classifica fetch failed:', e.message);
  }

  // 2. Fetch and parse calendar/results
  try {
    console.log('Fetching calendar...');
    const calHtml = await fetchHTML(REPAIR_CALENDAR_URL);
    const liveResults = parseCalendar(calHtml);

    if (liveResults.length > 0) {
      // Read existing results
      const existing = JSON.parse(readFileSync(RESULTS_PATH, 'utf8'));
      const existingMap = new Map();
      existing.forEach(m => existingMap.set(m.date + '|' + m.opponent, m));

      let updated = 0;
      liveResults.forEach(lr => {
        const key = lr.date + '|' + lr.opponent;
        const old = existingMap.get(key);
        if (old && old.result === 'T') {
          // Update: this match was played
          Object.assign(old, lr);
          updated++;
        } else if (!old) {
          existing.push(lr);
          updated++;
        }
      });

      if (updated > 0) {
        writeFileSync(RESULTS_PATH, JSON.stringify(existing, null, 2) + '\n');
        console.log(`Updated season_results.json: ${updated} matches refreshed`);
      } else {
        console.log('No new results to update');
      }
    } else {
      console.log('No Latina results found on calendar page');
    }
  } catch (e) {
    console.error('Calendar fetch failed:', e.message);
  }

  console.log('Done.');
}

main().catch(e => { console.error('Script error:', e); process.exit(1); });
