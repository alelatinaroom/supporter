/* ==============================
   AleLatina Supporter Rooms - App
   ============================== */

const APP = {

  /* ---------- BAD WORDS FILTER ---------- */
  badWords: [
    // Volgarità italiane
    'cazzo', 'cazzata', 'cazzone', 'cazzimma', 'cazzuto', 'cazzaro',
    'coglione', 'coglioni', 'coglionata', 'coglionazzo',
    'stronzo', 'stronza', 'stronzata', 'stronzate', 'stronzino',
    'merda', 'merdata', 'merdoso', 'merdosa', 'merde',
    'vaffanculo', 'fanculo', 'fancazzista', 'fancazzismo',
    'puttana', 'puttaniere', 'puttanata', 'puttane',
    'troia', 'troietta', 'troione',
    'zoccola', 'zoccole',
    'bastardo', 'bastarda', 'bastardi', 'bastardata',
    'fottuto', 'fottuta', 'fottuti', 'fottute', 'fotti',
    'sfigato', 'sfigata', 'sfigati',
    'cacare', 'cacato', 'cacata',
    'pisciare', 'pisciato', 'piscia',
    'culattone', 'culattoni', 'culatta',
    'ricchione', 'ricchioni',
    'finocchio', 'finocchi',
    'frocio', 'froci',
    'negro', 'negra', 'negri', 'negre',
    'terrone', 'terrona', 'terroni',
    'polentone', 'polentoni',
    'mongoloide', 'mongoloidi',
    'ritardato', 'ritardata', 'ritardati',
    'deficiente', 'deficienti', 'deficenza',
    'cretino', 'cretina', 'cretini', 'cretinata',
    'idiota', 'idioti', 'idiozia',
    'imbecille', 'imbecilli',
    'mammt', 'mortacci', 'mortaccela',
    'porco', 'porca', 'porcata', 'porcate',
    'maiale', 'maiala', 'maiali',
    'succhia', 'succhiare', 'succhiami',
    'segaiolo', 'segaiola', 'sega',
    'sborra', 'sborrare', 'sborrone',
    'sputtanare', 'sputtanato',
    'incazzato', 'incazzarsi', 'incazzatura',
    'rompicazzo', 'rompicoglioni',
    'testa di cazzo', 'testa di minchia',
    // Inglese volgare
    'fuck', 'fucking', 'fucker', 'fuckers', 'fucked',
    'shit', 'bullshit', 'motherfucker',
    'asshole', 'bitch',
    // Blasfemia / bestemmie
    'dio bestia', 'dio porco', 'dio cane', 'dio maiale',
    'dio schifoso', 'dio infame', 'dio merda', 'dio bastardo',
    'cristo bestia', 'cristo porco', 'cristo cane',
    'madonna puttana', 'madonna troia', 'madonna zoccola',
    'madonna bastarda', 'madonna porca',
    'gesù porco', 'gesù bestia', 'gesù cane',
    'sangue di dio', 'sangue di cristo', 'sangue della madonna',
    'santiddio',
    'porco dio', 'porco cristo', 'porco gesù', 'porca madonna',
    'porca puttana', 'porco il dio', 'porco quel dio',
    'dio bono', 'dio bon', 'dio ladro',
    'bestemmia', 'bestemmiare', 'bestemmiatore',
    'dio', 'gesù', 'cristo', 'madonna',  // solo se in contesto blasfemo
  ],

  /* ---------- PROFANITY CONTEXT CHECK ---------- */
  // Parole religiose che sono OK da sole ma blasfeme in certi contesti
  religiousWords: ['dio', 'gesù', 'cristo', 'madonna', 'gesu', 'crist'],
  blasfemoPrefixes: ['porco', 'porca', 'cane', 'bestia', 'maiale', 'schifoso', 'infame', 'merda', 'bastardo', 'puttana', 'troia', 'zoccola', 'ladro', 'bono', 'bon'],
  blasfemoSuffixes: ['porco', 'porca', 'cane', 'bestia', 'maiale', 'schifoso', 'infame', 'merda', 'bastardo', 'puttana', 'troia', 'zoccola', 'ladro'],

  /* ---------- STATE ---------- */
  state: {
    users: JSON.parse(localStorage.getItem('alelatina_users')) || [],
    messages: JSON.parse(localStorage.getItem('alelatina_messages')) || [],
    privateMessages: JSON.parse(localStorage.getItem('alelatina_pms')) || [],
    currentUser: null,
    currentFilter: 'all',
    sidebarOpen: false,
    redirectAfterLogin: null,
    radio: JSON.parse(localStorage.getItem('alelatina_radio')) || { streamUrl: '', streamName: 'AleLatina Radio', podcasts: [] },
  },

  /* ---------- DOM REFS ---------- */
  el: {},

  /* ---------- INIT ---------- */
  init() {
    sessionStorage.removeItem('alelatina_session');
    this.cacheDOM();
    this.bindEvents();
    this.seedAdmin();
    this.showSplash();
  },

  cacheDOM() {
    const $ = id => document.getElementById(id);
    const qs = sel => document.querySelector(sel);
    const qsa = sel => document.querySelectorAll(sel);
    this.el = {
      splash: $('splashScreen'),
      topBar: $('topBar'),
      sidebar: $('sidebar'),
      sidebarOverlay: $('sidebarOverlay'),
      menuToggle: $('menuToggle'),
      sidebarClose: $('sidebarClose'),
      topUsername: $('topUsername'),
      topAvatar: $('topAvatar'),
      topAuth: $('topAuth'),
      topLoginBtn: $('topLoginBtn'),
      topRegisterBtn: $('topRegisterBtn'),
      topLogoutBtn: $('topLogoutBtn'),
      sidebarUsername: $('sidebarUsername'),
      sidebarAvatar: $('sidebarAvatar'),
      sidebarRole: $('sidebarRole'),
      sidebarAdminBtn: $('sidebarAdminBtn'),
      sidebarLoginBtn: $('sidebarLoginBtn'),
      sidebarFooter: $('sidebarFooter'),
      logoutBtn: $('logoutBtn'),
      authPage: $('authPage'),
      guestbookPage: $('guestbookPage'),
      membersPage: $('membersPage'),
      rulesPage: $('rulesPage'),
      adminPage: $('adminPage'),
      loginUsername: $('loginUsername'),
      loginPassword: $('loginPassword'),
      loginBtn: $('loginBtn'),
      loginError: $('loginError'),
      regUsername: $('regUsername'),
      regEmail: $('regEmail'),
      regPassword: $('regPassword'),
      registerBtn: $('registerBtn'),
      regError: $('regError'),
      authTabs: qsa('.auth-tab'),
      gbMessageInput: $('gbMessageInput'),
      gbPostBtn: $('gbPostBtn'),
      gbPostError: $('gbPostError'),
      gbCharCount: $('gbCharCount'),
      gbNewPost: $('gbNewPost'),
      gbMessages: $('gbMessages'),
      gbNewAvatar: $('gbNewAvatar'),
      gbFilters: qsa('.gb-filter'),
      membersSearch: $('membersSearch'),
      membersList: $('membersList'),
      adminTabs: qsa('.admin-tab'),
      adminMessages: $('adminMessages'),
      adminUsers: $('adminUsers'),
      adminRadio: $('adminRadio'),
      adminMsgList: $('adminMsgList'),
      adminUserList: $('adminUserList'),
      adminMsgCount: $('adminMsgCount'),
      adminUserCount: $('adminUserCount'),
      adminClearFiltered: $('adminClearFiltered'),
      adminAddUserBtn: $('adminAddUserBtn'),
      userModal: $('userModal'),
      userModalTitle: $('userModalTitle'),
      userModalClose: $('userModalClose'),
      umUsername: $('umUsername'),
      umEmail: $('umEmail'),
      umPassword: $('umPassword'),
      umRole: $('umRole'),
      umError: $('umError'),
      umCancelBtn: $('umCancelBtn'),
      umSaveBtn: $('umSaveBtn'),
      toastContainer: $('toastContainer'),
      sidebarItems: qsa('.sidebar-item[data-page]'),
      sidebarMsgBadge: $('sidebarMsgBadge'),
      homePage: $('homePage'),
      profilePage: $('profilePage'),
      profileAvatar: $('profileAvatar'),
      profileAvatarOverlay: $('profileAvatarOverlay'),
      profileAvatarInput: $('profileAvatarInput'),
      profileUsername: $('profileUsername'),
      profileEmail: $('profileEmail'),
      profileRole: $('profileRole'),
      profileJoined: $('profileJoined'),
      profileSaveBtn: $('profileSaveBtn'),
      profileRemoveBtn: $('profileRemoveBtn'),
      profileStatus: $('profileStatus'),
      messagesPage: $('messagesPage'),
      pmInbox: $('pmInbox'),
      pmConversation: $('pmConversation'),
      pmConversations: $('pmConversations'),
      pmBackBtn: $('pmBackBtn'),
      pmConvHeader: $('pmConvHeader'),
      pmConvMessages: $('pmConvMessages'),
      pmMessageInput: $('pmMessageInput'),
      pmSendBtn: $('pmSendBtn'),
      pmError: $('pmError'),
      radioPage: $('radioPage'),
      radioAudio: $('radioAudio'),
      radioPlayBtn: $('radioPlayBtn'),
      radioStopBtn: $('radioStopBtn'),
      radioStreamName: $('radioStreamName'),
      radioPodcastList: $('radioPodcastList'),
      radioConfigInfo: $('radioConfigInfo'),
      sidebarRadioBadge: $('sidebarRadioBadge'),
      adminStreamUrl: $('adminStreamUrl'),
      adminStreamName: $('adminStreamName'),
      adminSaveStreamBtn: $('adminSaveStreamBtn'),
      adminAddPodcastBtn: $('adminAddPodcastBtn'),
      adminPodcastList: $('adminPodcastList'),
      podcastModal: $('podcastModal'),
      podcastModalTitle: $('podcastModalTitle'),
      podcastModalClose: $('podcastModalClose'),
      pmTitle: $('pmTitle'),
      pmDescription: $('pmDescription'),
      pmAudioUrl: $('pmAudioUrl'),
      pmImageUrl: $('pmImageUrl'),
      pmCancelBtn: $('pmCancelBtn'),
      pmSaveBtn: $('pmSaveBtn'),
      pmPodcastError: $('pmPodcastError'),
    };
  },

  bindEvents() {
    // Auth tabs
    this.el.authTabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchAuthTab(tab.dataset.form));
    });

    // Login & Register
    this.el.loginBtn.addEventListener('click', () => this.login());
    this.el.loginPassword.addEventListener('keydown', e => { if (e.key === 'Enter') this.login(); });
    this.el.registerBtn.addEventListener('click', () => this.register());
    this.el.regPassword.addEventListener('keydown', e => { if (e.key === 'Enter') this.register(); });

    // Message posting: events bound dynamically in renderGuestbookUI

    // Filters
    this.el.gbFilters.forEach(f => {
      f.addEventListener('click', () => {
        this.el.gbFilters.forEach(x => x.classList.remove('active'));
        f.classList.add('active');
        this.state.currentFilter = f.dataset.filter;
        this.renderMessages();
      });
    });

    // Members search
    this.el.membersSearch.addEventListener('input', () => this.renderMembers());

    // Sidebar
    this.el.menuToggle.addEventListener('click', () => this.toggleSidebar());
    this.el.sidebarClose.addEventListener('click', () => this.closeSidebar());
    this.el.sidebarOverlay.addEventListener('click', () => this.closeSidebar());

    // Navigation items
    this.el.sidebarItems.forEach(item => {
      item.addEventListener('click', () => {
        this.navigateTo(item.dataset.page);
        this.closeSidebar();
      });
    });

    // Top bar auth buttons (safe: elements might not exist in cached HTML)
    if (this.el.topLoginBtn) this.el.topLoginBtn.addEventListener('click', () => this.showAuth());
    if (this.el.topRegisterBtn) this.el.topRegisterBtn.addEventListener('click', () => {
      this.showAuth();
      this.switchAuthTab('register');
    });
    if (this.el.sidebarLoginBtn) this.el.sidebarLoginBtn.addEventListener('click', () => {
      this.showAuth();
      this.closeSidebar();
    });

    // Logout buttons
    this.el.logoutBtn.addEventListener('click', () => this.logout());
    if (this.el.topLogoutBtn) this.el.topLogoutBtn.addEventListener('click', () => this.logout());

    // Admin tabs
    this.el.adminTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.el.adminTabs.forEach(x => x.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        if (tab.dataset.atab === 'messages') {
          this.el.adminMessages.classList.add('active');
          this.renderAdminMessages();
        } else if (tab.dataset.atab === 'users') {
          this.el.adminUsers.classList.add('active');
          this.renderAdminUsers();
        } else if (tab.dataset.atab === 'radio') {
          this.el.adminRadio.classList.add('active');
          this.renderAdminRadio();
        }
      });
    });

    // Admin clear filtered
    this.el.adminClearFiltered.addEventListener('click', () => this.adminClearFiltered());

    // Admin add/edit user
    if (this.el.adminAddUserBtn) {
      this.el.adminAddUserBtn.addEventListener('click', () => this.adminOpenCreateUser());
    }
    if (this.el.userModalClose) {
      this.el.userModalClose.addEventListener('click', () => this.adminCloseUserModal());
    }
    if (this.el.umCancelBtn) {
      this.el.umCancelBtn.addEventListener('click', () => this.adminCloseUserModal());
    }
    if (this.el.umSaveBtn) {
      this.el.umSaveBtn.addEventListener('click', () => this.adminSaveUser());
    }
    if (this.el.userModal) {
      this.el.userModal.addEventListener('click', e => {
        if (e.target === this.el.userModal) this.adminCloseUserModal();
      });
    }

    // Radio play/stop
    if (this.el.radioPlayBtn) this.el.radioPlayBtn.addEventListener('click', () => this.radioPlay());
    if (this.el.radioStopBtn) this.el.radioStopBtn.addEventListener('click', () => this.radioStop());

    // Admin radio
    if (this.el.adminSaveStreamBtn) this.el.adminSaveStreamBtn.addEventListener('click', () => this.adminSaveRadioConfig());
    if (this.el.adminAddPodcastBtn) this.el.adminAddPodcastBtn.addEventListener('click', () => this.adminOpenAddPodcast());

    // Podcast modal
    if (this.el.podcastModalClose) this.el.podcastModalClose.addEventListener('click', () => this.adminClosePodcastModal());
    if (this.el.pmCancelBtn) this.el.pmCancelBtn.addEventListener('click', () => this.adminClosePodcastModal());
    if (this.el.pmSaveBtn) this.el.pmSaveBtn.addEventListener('click', () => this.adminSavePodcast());
    if (this.el.podcastModal) this.el.podcastModal.addEventListener('click', e => {
      if (e.target === this.el.podcastModal) this.adminClosePodcastModal();
    });

    // Profile
    if (this.el.profileAvatarOverlay) {
      this.el.profileAvatarOverlay.addEventListener('click', () => this.el.profileAvatarInput.click());
    }
    if (this.el.profileAvatarInput) {
      this.el.profileAvatarInput.addEventListener('change', e => this.handleAvatarUpload(e));
    }
    if (this.el.profileSaveBtn) {
      this.el.profileSaveBtn.addEventListener('click', () => this.saveProfile());
    }
    if (this.el.profileRemoveBtn) {
      this.el.profileRemoveBtn.addEventListener('click', () => this.removeAvatar());
    }

    // Private messages
    if (this.el.pmBackBtn) {
      this.el.pmBackBtn.addEventListener('click', () => this.showInbox());
    }
    if (this.el.pmSendBtn) {
      this.el.pmSendBtn.addEventListener('click', () => this.sendPrivateMessage());
    }
    if (this.el.pmMessageInput) {
      this.el.pmMessageInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && e.ctrlKey) this.sendPrivateMessage();
      });
    }
  },

  /* ---------- SPLASH ---------- */
  showSplash() {
    setTimeout(() => {
      this.el.splash.classList.add('hide');
      setTimeout(() => {
        this.el.splash.style.display = 'none';
        this.showHome();
      }, 800);
    }, 1800);
  },

  /* ---------- AUTH ---------- */
  seedAdmin() {
    const adminExists = this.state.users.find(u => u.username === 'admin');
    if (!adminExists) {
      this.state.users.push({
        id: 'admin_' + Date.now(),
        username: 'admin',
        password: 'AdminLatina2025!',
        email: 'admin@alelatina.it',
        role: 'admin',
        createdAt: Date.now(),
        banned: false,
      });
      this.saveUsers();
    }
  },

  switchAuthTab(form) {
    this.el.authTabs.forEach(t => t.classList.toggle('active', t.dataset.form === form));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.getElementById(form + 'Form').classList.add('active');
    this.el.loginError.textContent = '';
    this.el.regError.textContent = '';
  },

  login() {
    const username = this.el.loginUsername.value.trim();
    const password = this.el.loginPassword.value.trim();
    this.el.loginError.textContent = '';

    if (!username || !password) {
      this.el.loginError.textContent = 'Inserisci username e password.';
      return;
    }

    const user = this.state.users.find(u => u.username === username);
    if (!user) {
      this.el.loginError.textContent = 'Utente non trovato.';
      return;
    }
    if (user.banned) {
      this.el.loginError.textContent = 'Il tuo account è stato sospeso.';
      return;
    }
    if (user.password !== password) {
      this.el.loginError.textContent = 'Password errata.';
      return;
    }

    this.state.currentUser = user;
    this.showApp();
    this.toast('Benvenuto, ' + user.username + '!', 'success');
    this.el.loginUsername.value = '';
    this.el.loginPassword.value = '';
  },

  register() {
    const username = this.el.regUsername.value.trim();
    const email = this.el.regEmail.value.trim();
    const password = this.el.regPassword.value.trim();
    this.el.regError.textContent = '';

    if (!username || !email || !password) {
      this.el.regError.textContent = 'Compila tutti i campi.';
      return;
    }
    if (username.length < 3) {
      this.el.regError.textContent = 'Username troppo corto (min 3 caratteri).';
      return;
    }
    if (password.length < 6) {
      this.el.regError.textContent = 'Password troppo corta (min 6 caratteri).';
      return;
    }
    if (!email.includes('@')) {
      this.el.regError.textContent = 'Email non valida.';
      return;
    }
    if (this.state.users.find(u => u.username === username)) {
      this.el.regError.textContent = 'Username già in uso.';
      return;
    }

    const user = {
      id: 'user_' + Date.now(),
      username,
      password,
      email,
      role: 'user',
      createdAt: Date.now(),
      banned: false,
    };

    this.state.users.push(user);
    this.saveUsers();

    this.state.currentUser = user;
    this.showApp();
    this.toast('Registrazione completata! Benvenuto ' + username + '!', 'success');
    this.el.regUsername.value = '';
    this.el.regEmail.value = '';
    this.el.regPassword.value = '';
  },

  logout() {
    this.state.currentUser = null;
    this.closeSidebar();
    this.showHome();
    this.toast('Arrivederci! #ForzaLatina', 'info');
  },

  /* ---------- APP UI ---------- */
  showHome() {
    if (!this.el.homePage) {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a1628;color:#e8edf5;font-family:sans-serif;text-align:center;padding:40px"><div><h2 style="color:#4da6ff">AleLatina Supporter Rooms</h2><p style="margin:20px 0;color:#8899b4">La pagina è stata aggiornata. Per favore fai <strong>Ctrl+F5</strong> per ricaricare.</p><button onclick="location.reload(true)" style="padding:10px 24px;background:#4da6ff;border:none;border-radius:8px;color:#fff;font-weight:600;cursor:pointer">Ricarica pagina</button></div></div>';
      return;
    }
    this.state.currentUser = null;
    this.el.authPage.style.display = 'none';
    this.el.topBar.style.display = 'none';
    this.el.sidebar.style.display = 'none';
    this.el.guestbookPage.style.display = 'none';
    this.el.membersPage.style.display = 'none';
    this.el.rulesPage.style.display = 'none';
    this.el.adminPage.style.display = 'none';
    this.el.profilePage.style.display = 'none';
    this.el.messagesPage.style.display = 'none';
    this.el.homePage.style.display = '';
  },

  enterAsGuest() {
    this.state.currentUser = null;
    this.el.homePage.style.display = 'none';
    this.el.topBar.style.display = '';
    this.el.sidebar.style.display = '';

    if (this.el.topUser) this.el.topUser.style.display = 'none';
    if (this.el.topAuth) this.el.topAuth.style.display = '';

    if (this.el.sidebarUser) this.el.sidebarUser.style.display = 'none';
    if (this.el.sidebarLoginBtn) this.el.sidebarLoginBtn.style.display = '';
    if (this.el.logoutBtn) this.el.logoutBtn.style.display = 'none';
    if (this.el.sidebarAdminBtn) this.el.sidebarAdminBtn.style.display = 'none';

    this.navigateTo('guestbook');
  },

  enterAsUser() {
    this.showAuth();
  },

  showAuth() {
    this.el.homePage.style.display = 'none';
    this.el.authPage.style.display = '';
    this.el.guestbookPage.style.display = 'none';
    this.el.membersPage.style.display = 'none';
    this.el.rulesPage.style.display = 'none';
    this.el.adminPage.style.display = 'none';
    this.el.profilePage.style.display = 'none';
    this.el.messagesPage.style.display = 'none';
    this.el.topBar.style.display = 'none';
    this.el.sidebar.style.display = 'none';
  },

  showApp() {
    this.el.homePage.style.display = 'none';
    this.el.authPage.style.display = 'none';
    this.el.topBar.style.display = '';
    this.el.sidebar.style.display = '';

    // Show user info
    if (this.el.topUser) this.el.topUser.style.display = '';
    if (this.el.topAuth) this.el.topAuth.style.display = 'none';
    if (this.el.sidebarUser) this.el.sidebarUser.style.display = '';
    if (this.el.sidebarLoginBtn) this.el.sidebarLoginBtn.style.display = 'none';
    if (this.el.logoutBtn) this.el.logoutBtn.style.display = '';

    // Update user info in UI
    const u = this.state.currentUser;
    const initial = u.username.charAt(0).toUpperCase();
    if (this.el.topUsername) this.el.topUsername.textContent = u.username;
    if (this.el.topAvatar) {
      if (u.avatar) {
        this.el.topAvatar.innerHTML = '<img src="' + u.avatar + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
      } else {
        this.el.topAvatar.textContent = initial;
      }
    }
    if (this.el.sidebarAvatar) {
      if (u.avatar) {
        this.el.sidebarAvatar.innerHTML = '<img src="' + u.avatar + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
      } else {
        this.el.sidebarAvatar.textContent = initial;
      }
    }
    if (this.el.sidebarUsername) this.el.sidebarUsername.textContent = u.username;
    if (this.el.sidebarRole) this.el.sidebarRole.textContent = u.role === 'admin' ? 'Amministratore' : 'Tifoso';

    // Admin button visibility
    if (this.el.sidebarAdminBtn) this.el.sidebarAdminBtn.style.display = u.role === 'admin' ? '' : 'none';

    // Update unread badge
    this.updateMsgBadge();

    // Update radio LIVE badge
    this.updateRadioBadge();

    // Navigate to default page
    this.navigateTo('guestbook');
  },

  navigateTo(page) {
    // Hide all pages
    const pages = ['homePage', 'guestbookPage', 'membersPage', 'rulesPage', 'adminPage', 'profilePage', 'messagesPage', 'radioPage'];
    pages.forEach(p => {
      if (this.el[p]) this.el[p].style.display = 'none';
    });

    // Update sidebar active state
    if (this.el.sidebarItems) {
      this.el.sidebarItems.forEach(i => {
        i.classList.toggle('active', i.dataset.page === page);
      });
    }

    switch (page) {
      case 'home':
        if (this.state.currentUser) {
          this.navigateTo('guestbook');
          return;
        }
        this.showHome();
        break;
      case 'guestbook':
        this.el.guestbookPage.style.display = '';
        this.renderGuestbookUI();
        this.renderMessages();
        break;
      case 'members':
        this.el.membersPage.style.display = '';
        this.renderMembers();
        break;
      case 'rules':
        this.el.rulesPage.style.display = '';
        break;
      case 'admin':
        if (this.state.currentUser && this.state.currentUser.role === 'admin') {
          this.el.adminPage.style.display = '';
          this.renderAdminMessages();
          this.renderAdminUsers();
        }
        break;
      case 'radio':
        if (this.state.currentUser) {
          this.el.radioPage.style.display = '';
          this.renderRadioPage();
        } else {
          this.navigateTo('guestbook');
        }
        break;
      case 'profile':
        if (!this.state.currentUser) { this.navigateTo('guestbook'); return; }
        this.el.profilePage.style.display = '';
        this.renderProfile();
        break;
      case 'messages':
        if (!this.state.currentUser) { this.navigateTo('guestbook'); return; }
        this.el.messagesPage.style.display = '';
        this.renderInbox();
        break;
    }
  },

  /* ---------- SIDEBAR ---------- */
  toggleSidebar() {
    this.state.sidebarOpen = !this.state.sidebarOpen;
    this.el.sidebar.classList.toggle('open', this.state.sidebarOpen);
    this.el.sidebarOverlay.classList.toggle('show', this.state.sidebarOpen);
  },

  closeSidebar() {
    this.state.sidebarOpen = false;
    this.el.sidebar.classList.remove('open');
    this.el.sidebarOverlay.classList.remove('show');
  },

  /* ---------- BAD WORDS FILTER ---------- */
  containsBadWords(text) {
    const lower = text.toLowerCase();
    for (const word of this.badWords) {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp('\\b' + escaped + '\\b', 'i');
      if (regex.test(lower)) return true;
    }
    return false;
  },

  filterBadWords(text) {
    let result = text;
    // Replace full blasphemy phrases first
    const phrases = [
      'porco dio', 'porco cristo', 'porco gesù', 'porca madonna',
      'dio porco', 'dio cane', 'dio bestia', 'dio maiale',
      'dio schifoso', 'dio infame', 'dio merda', 'dio bastardo',
      'cristo porco', 'cristo cane', 'cristo bestia',
      'madonna puttana', 'madonna troia', 'madonna zoccola', 'madonna porca',
      'gesù porco', 'gesù cane', 'gesù bestia',
      'sangue di dio', 'sangue di cristo', 'sangue della madonna',
      'porca puttana', 'porca madonna',
      'dio bono', 'dio bon', 'dio ladro',
      'dio bestia', 'dio cane',
    ];
    for (const phrase of phrases) {
      const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'gi');
      result = result.replace(regex, '***');
    }

    // Replace single bad words
    for (const word of this.badWords) {
      if (word.includes(' ')) continue; // already handled as phrase
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp('\\b' + escaped + '\\b', 'gi');
      result = result.replace(regex, '***');
    }

    return result;
  },

  /* ---------- MESSAGES ---------- */
  postMessage() {
    const text = this.el.gbMessageInput.value.trim();
    this.el.gbPostError.textContent = '';

    if (!text) {
      this.el.gbPostError.textContent = 'Scrivi un messaggio.';
      return;
    }
    if (text.length > 500) {
      this.el.gbPostError.textContent = 'Massimo 500 caratteri.';
      return;
    }

    const hasBad = this.containsBadWords(text);
    const filtered = hasBad ? this.filterBadWords(text) : text;

    const message = {
      id: 'msg_' + Date.now(),
      userId: this.state.currentUser.id,
      author: this.state.currentUser.username,
      authorRole: this.state.currentUser.role,
      text: filtered,
      originalText: text,
      filtered: hasBad,
      likes: [],
      createdAt: Date.now(),
      deleted: false,
    };

    this.state.messages.unshift(message);
    this.saveMessages();

    this.el.gbMessageInput.value = '';
    this.updateCharCount();

    if (hasBad) {
      this.toast('Messaggio pubblicato (contenuto filtrato).', 'warning');
    } else {
      this.toast('Messaggio pubblicato!', 'success');
    }

    this.renderMessages();
  },

  toggleLike(msgId) {
    if (!this.state.currentUser) {
      this.toast('Accedi per mettere like ai messaggi!', 'warning');
      return;
    }
    const msg = this.state.messages.find(m => m.id === msgId);
    if (!msg) return;
    const uid = this.state.currentUser.id;
    const idx = msg.likes.indexOf(uid);
    if (idx > -1) {
      msg.likes.splice(idx, 1);
    } else {
      msg.likes.push(uid);
    }
    this.saveMessages();
    this.renderMessages();
  },

  deleteMessage(msgId) {
    if (!this.state.currentUser) return;
    if (!confirm('Eliminare questo messaggio?')) return;
    const msg = this.state.messages.find(m => m.id === msgId);
    if (msg) msg.deleted = true;
    this.saveMessages();
    this.renderMessages();
    this.toast('Messaggio eliminato.', 'info');
  },

  renderGuestbookUI() {
    const container = this.el.gbNewPost;
    if (!container) return;
    if (this.state.currentUser) {
      const u = this.state.currentUser;
      const avatarHtml = u.avatar
        ? '<img src="' + u.avatar + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">'
        : u.username.charAt(0).toUpperCase();
      container.innerHTML = [
        '<div class="gb-new-avatar" id="gbNewAvatar">' + avatarHtml + '</div>',
        '<div class="gb-new-input">',
          '<textarea id="gbMessageInput" rows="3" placeholder="Scrivi qualcosa ai tuoi nerazzurri... #ForzaLatina"></textarea>',
          '<div class="gb-new-tools">',
            '<span class="gb-charcount" id="gbCharCount">0/500</span>',
            '<button class="btn btn-primary btn-sm" id="gbPostBtn"><i class="fas fa-paper-plane"></i> Invia</button>',
          '</div>',
          '<p id="gbPostError" class="form-error"></p>',
        '</div>'
      ].join('');

      this.el.gbMessageInput = document.getElementById('gbMessageInput');
      this.el.gbPostBtn = document.getElementById('gbPostBtn');
      this.el.gbPostError = document.getElementById('gbPostError');
      this.el.gbCharCount = document.getElementById('gbCharCount');
      this.el.gbNewAvatar = document.getElementById('gbNewAvatar');

      if (this.el.gbPostBtn) {
        this.el.gbPostBtn.addEventListener('click', () => this.postMessage());
      }
      if (this.el.gbMessageInput) {
        this.el.gbMessageInput.addEventListener('keydown', e => {
          if (e.key === 'Enter' && e.ctrlKey) this.postMessage();
        });
        this.el.gbMessageInput.addEventListener('input', () => this.updateCharCount());
      }
    } else {
      container.innerHTML = [
        '<div class="gb-login-prompt">',
          '<i class="fas fa-lock"></i>',
          '<h3>Accedi per scrivere</h3>',
          '<p>Solo i tifosi registrati possono lasciare un messaggio. Registrati subito, è gratuito!</p>',
          '<button class="btn btn-primary" onclick="APP.showAuth()"><i class="fas fa-right-to-bracket"></i> Accedi / Registrati</button>',
        '</div>'
      ].join('');
    }
  },

  updateCharCount() {
    const len = this.el.gbMessageInput.value.length;
    this.el.gbCharCount.textContent = len + '/500';
    this.el.gbCharCount.style.color = len > 500 ? 'var(--accent3)' : 'var(--text-muted)';
  },

  /* ---------- RENDER MESSAGES ---------- */
  renderMessages() {
    const container = this.el.gbMessages;
    const filter = this.state.currentFilter;

    let msgs = this.state.messages.filter(m => !m.deleted);

    switch (filter) {
      case 'latest':
        msgs = msgs.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'popular':
        msgs = msgs.sort((a, b) => b.likes.length - a.likes.length);
        break;
      default:
        msgs = msgs.sort((a, b) => b.createdAt - a.createdAt);
    }

    if (msgs.length === 0) {
      container.innerHTML = `
        <div class="gb-empty">
          <i class="fas fa-message"></i>
          <p>Nessun messaggio ancora. Sii il primo a scrivere!</p>
        </div>`;
      return;
    }

    const currentUid = this.state.currentUser ? this.state.currentUser.id : null;
    const isAdmin = this.state.currentUser ? this.state.currentUser.role === 'admin' : false;

    container.innerHTML = msgs.map(msg => {
      const time = this.formatTime(msg.createdAt);
      const likes = msg.likes.length;
      const liked = currentUid ? msg.likes.includes(currentUid) : false;
      const authorUser = this.state.users.find(u => u.id === msg.userId);
      const avatarColor = this.stringToColor(msg.author);
      const isOwn = currentUid ? msg.userId === currentUid : false;

      const badgeHtml = msg.filtered
        ? '<span class="msg-badge msg-badge-filtered"><i class="fas fa-filter"></i> Filtrato</span>'
        : '';
      const adminBadge = msg.authorRole === 'admin'
        ? '<span class="msg-badge msg-badge-admin"><i class="fas fa-shield"></i> Admin</span>'
        : '';

      const deleteBtn = (isAdmin || isOwn)
        ? `<button class="msg-delete-btn" onclick="APP.deleteMessage('${msg.id}')" title="Elimina"><i class="fas fa-trash-can"></i></button>`
        : '';

      const likeBtn = currentUid
        ? `<button class="msg-like-btn ${liked ? 'liked' : ''}" onclick="APP.toggleLike('${msg.id}')">
             <i class="fa${liked ? 's' : 'r'} fa-heart"></i> ${likes > 0 ? likes : ''}
           </button>`
        : `<span class="msg-like-btn" style="cursor:default"><i class="fa-regular fa-heart"></i> ${likes > 0 ? likes : ''}</span>`;

      let displayText = msg.text;
      if (msg.filtered) {
        displayText = displayText.replace(/\*\*\*/g, '<span class="censored">[censurato]</span>');
      }

      let avatarDisplay;
      if (authorUser && authorUser.avatar) {
        avatarDisplay = '<img src="' + authorUser.avatar + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
      } else {
        avatarDisplay = msg.author.charAt(0).toUpperCase();
      }

      return `
        <div class="msg-card">
          <div class="msg-header">
            <div class="msg-avatar" style="background:${avatarColor}">${avatarDisplay}</div>
            <div>
              <div class="msg-author">${msg.author} ${adminBadge} ${badgeHtml}</div>
              <div class="msg-time">${time}</div>
            </div>
          </div>
          <div class="msg-body">${displayText}</div>
          <div class="msg-footer">
            ${likeBtn}
            ${deleteBtn}
          </div>
        </div>`;
    }).join('');
  },

  /* ---------- MEMBERS ---------- */
  renderMembers() {
    const query = this.el.membersSearch.value.toLowerCase().trim();
    let users = this.state.users.filter(u => !u.banned);
    if (query) {
      users = users.filter(u => u.username.toLowerCase().includes(query));
    }
    users.sort((a, b) => a.username.localeCompare(b.username));

    const container = this.el.membersList;

    if (users.length === 0) {
      container.innerHTML = '<div class="gb-empty"><i class="fas fa-users"></i><p>Nessun utente trovato.</p></div>';
      return;
    }

    const currentUid = this.state.currentUser ? this.state.currentUser.id : null;
    container.innerHTML = users.map(u => {
      const color = this.stringToColor(u.username);
      const joinDate = new Date(u.createdAt).toLocaleDateString('it-IT');
      const roleBadge = u.role === 'admin'
        ? '<span class="member-role-badge member-role-admin"><i class="fas fa-shield"></i> Admin</span>'
        : '<span class="member-role-badge member-role-user">Tifoso</span>';
      const avatarDisplay = u.avatar
        ? '<img src="' + u.avatar + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">'
        : u.username.charAt(0).toUpperCase();
      const pmBtn = currentUid && currentUid !== u.id && u.role !== 'admin'
        ? '<button class="btn btn-ghost btn-sm" onclick="APP.openConversation(\'' + u.id + '\')" style="margin-top:8px;width:100%"><i class="fas fa-envelope"></i> Messaggia</button>'
        : '';
      return `
        <div class="member-card">
          <div class="member-avatar" style="background:${color}">${avatarDisplay}</div>
          <div class="member-name">${u.username}</div>
          <div class="member-join">Iscritto il ${joinDate}</div>
          ${roleBadge}
          ${pmBtn}
        </div>`;
    }).join('');
  },

  /* ---------- ADMIN ---------- */
  renderAdminMessages() {
    const msgs = this.state.messages.filter(m => !m.deleted);
    this.el.adminMsgCount.textContent = msgs.length + ' messaggi';
    const container = this.el.adminMsgList;

    if (msgs.length === 0) {
      container.innerHTML = '<div class="gb-empty"><i class="fas fa-comment"></i><p>Nessun messaggio.</p></div>';
      return;
    }

    container.innerHTML = msgs.sort((a, b) => b.createdAt - a.createdAt).map(msg => {
      const time = this.formatTime(msg.createdAt);
      const isFiltered = msg.filtered;
      return `
        <div class="admin-msg-item">
          <div class="admin-msg-info">
            <div class="admin-msg-text">
              <strong>${msg.author}:</strong> ${msg.text}
              ${isFiltered ? '<span class="msg-badge msg-badge-filtered" style="font-size:10px;margin-left:6px;">Filtrato</span>' : ''}
            </div>
            <div class="admin-msg-meta">${time} · <i class="fa-regular fa-heart"></i> ${msg.likes.length} like</div>
          </div>
          <div class="admin-msg-actions">
            <button class="btn btn-danger btn-sm" onclick="APP.adminDeleteMsg('${msg.id}')"><i class="fas fa-trash"></i></button>
          </div>
        </div>`;
    }).join('');
  },

  renderAdminUsers() {
    const users = this.state.users;
    this.el.adminUserCount.textContent = users.length + ' utenti';
    const container = this.el.adminUserList;

    const currentId = this.state.currentUser.id;

    container.innerHTML = users.sort((a, b) => a.username.localeCompare(b.username)).map(u => {
      const color = this.stringToColor(u.username);
      const banned = u.banned;
      const joinDate = new Date(u.createdAt).toLocaleDateString('it-IT');
      const isSelf = u.id === currentId;
      const isAdminUser = u.role === 'admin';

      let actions = '';
      if (!isSelf && !isAdminUser) {
        actions = `
          <button class="btn btn-ghost btn-sm" onclick="APP.adminToggleBan('${u.id}')">
            <i class="fas ${banned ? 'fa-check-circle' : 'fa-ban'}"></i> ${banned ? 'Sbanna' : 'Banna'}
          </button>
          <button class="btn btn-ghost btn-sm" onclick="APP.adminOpenEditUser('${u.id}')"><i class="fas fa-pen"></i></button>
          <button class="btn btn-danger btn-sm" onclick="APP.adminDeleteUser('${u.id}')"><i class="fas fa-user-slash"></i></button>`;
      } else if (isSelf) {
        actions = '<span style="font-size:11px;color:var(--text-muted)">Sei tu</span>';
      } else if (isAdminUser) {
        actions = '<span style="font-size:11px;color:var(--accent2)"><i class="fas fa-shield"></i> Admin</span>';
      }

      return `
        <div class="admin-user-item" style="${banned ? 'opacity:0.5' : ''}">
          <div class="admin-user-avatar" style="background:${color}">${u.username.charAt(0).toUpperCase()}</div>
          <div class="admin-user-info">
            <div class="admin-user-name">${u.username} ${banned ? '<span style="color:var(--accent3);font-size:11px;">[BANNATO]</span>' : ''} ${isAdminUser ? '<span style="color:var(--accent2);font-size:11px;"><i class="fas fa-shield"></i></span>' : ''}</div>
            <div class="admin-user-email">${u.email} · Iscritto ${joinDate}</div>
          </div>
          <div class="admin-user-actions">${actions}</div>
        </div>`;
    }).join('');
  },

  adminDeleteMsg(msgId) {
    if (!confirm('Eliminare questo messaggio definitivamente?')) return;
    const msg = this.state.messages.find(m => m.id === msgId);
    if (msg) msg.deleted = true;
    this.saveMessages();
    this.renderAdminMessages();
    this.renderMessages();
    this.toast('Messaggio eliminato.', 'info');
  },

  adminDeleteUser(userId) {
    if (!confirm('Eliminare questo utente e tutti i suoi messaggi?')) return;
    // Remove user
    this.state.users = this.state.users.filter(u => u.id !== userId);
    // Soft-delete their messages
    this.state.messages.forEach(m => {
      if (m.userId === userId) m.deleted = true;
    });
    this.saveUsers();
    this.saveMessages();
    this.renderAdminUsers();
    this.renderAdminMessages();
    this.renderMessages();
    this.toast('Utente eliminato.', 'info');
  },

  adminToggleBan(userId) {
    const user = this.state.users.find(u => u.id === userId);
    if (!user) return;
    user.banned = !user.banned;
    this.saveUsers();
    this.renderAdminUsers();
    this.toast(user.banned ? 'Utente bannato.' : 'Utente sbannato.', user.banned ? 'error' : 'success');
  },

  adminClearFiltered() {
    const filtered = this.state.messages.filter(m => m.filtered && !m.deleted);
    if (filtered.length === 0) {
      this.toast('Nessun messaggio filtrato da eliminare.', 'info');
      return;
    }
    if (!confirm('Eliminare tutti i ' + filtered.length + ' messaggi filtrati?')) return;
    filtered.forEach(m => m.deleted = true);
    this.saveMessages();
    this.renderAdminMessages();
    this.renderMessages();
    this.toast(filtered.length + ' messaggi filtrati eliminati.', 'info');
  },

  /* ---------- ADMIN: USER MANAGEMENT ---------- */
  adminOpenCreateUser() {
    this._editingUserId = null;
    if (this.el.userModalTitle) this.el.userModalTitle.innerHTML = '<i class="fas fa-user-plus"></i> Nuovo Utente';
    if (this.el.umUsername) this.el.umUsername.value = '';
    if (this.el.umEmail) this.el.umEmail.value = '';
    if (this.el.umPassword) this.el.umPassword.value = '';
    if (this.el.umRole) this.el.umRole.value = 'user';
    if (this.el.umError) this.el.umError.textContent = '';
    if (this.el.userModal) this.el.userModal.style.display = '';
  },

  adminOpenEditUser(userId) {
    const user = this.state.users.find(u => u.id === userId);
    if (!user) return;
    this._editingUserId = userId;
    if (this.el.userModalTitle) this.el.userModalTitle.innerHTML = '<i class="fas fa-user-pen"></i> Modifica Utente';
    if (this.el.umUsername) this.el.umUsername.value = user.username;
    if (this.el.umEmail) this.el.umEmail.value = user.email;
    if (this.el.umPassword) this.el.umPassword.value = '';
    if (this.el.umRole) this.el.umRole.value = user.role;
    if (this.el.umError) this.el.umError.textContent = '';
    if (this.el.userModal) this.el.userModal.style.display = '';
  },

  adminSaveUser() {
    const username = this.el.umUsername.value.trim();
    const email = this.el.umEmail.value.trim();
    const password = this.el.umPassword.value.trim();
    this.el.umError.textContent = '';

    if (!username || !email) {
      this.el.umError.textContent = 'Username e email obbligatori.';
      return;
    }
    if (username.length < 3) {
      this.el.umError.textContent = 'Username troppo corto (min 3 caratteri).';
      return;
    }
    if (!email.includes('@')) {
      this.el.umError.textContent = 'Email non valida.';
      return;
    }

    if (this._editingUserId) {
      // Editing existing user
      const user = this.state.users.find(u => u.id === this._editingUserId);
      if (!user) return;
      // Check username uniqueness (excluding self)
      const dup = this.state.users.find(u => u.username === username && u.id !== this._editingUserId);
      if (dup) { this.el.umError.textContent = 'Username già in uso.'; return; }
      user.username = username;
      user.email = email;
      if (password) {
        if (password.length < 6) { this.el.umError.textContent = 'Password troppo corta (min 6 caratteri).'; return; }
        user.password = password;
      }
      user.role = this.el.umRole.value;
      this.saveUsers();
      this.renderAdminUsers();
      this.toast('Utente aggiornato.', 'success');
    } else {
      // Creating new user
      if (!password || password.length < 6) {
        this.el.umError.textContent = 'Password obbligatoria (min 6 caratteri).';
        return;
      }
      if (this.state.users.find(u => u.username === username)) {
        this.el.umError.textContent = 'Username già in uso.';
        return;
      }
      const newUser = {
        id: 'user_' + Date.now(),
        username,
        password,
        email,
        role: this.el.umRole.value,
        createdAt: Date.now(),
        banned: false,
      };
      this.state.users.push(newUser);
      this.saveUsers();
      this.renderAdminUsers();
      this.toast('Utente creato!', 'success');
    }
    this.adminCloseUserModal();
  },

  adminCloseUserModal() {
    this._editingUserId = null;
    if (this.el.userModal) this.el.userModal.style.display = 'none';
  },

  /* ---------- RADIO ---------- */
  radioPlay() {
    const streamUrl = this.state.radio.streamUrl;
    if (!streamUrl) {
      this.toast('Nessuna diretta configurata.', 'warning');
      return;
    }
    if (this.el.radioAudio) {
      this.el.radioAudio.src = streamUrl;
      this.el.radioAudio.play().catch(() => {
        this.toast('Errore durante la riproduzione.', 'error');
      });
    }
  },

  radioStop() {
    if (this.el.radioAudio) {
      this.el.radioAudio.pause();
      this.el.radioAudio.src = '';
    }
  },

  updateRadioBadge() {
    const badge = this.el.sidebarRadioBadge;
    if (!badge) return;
    if (this.state.radio.streamUrl) {
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }
  },

  renderRadioPage() {
    const radio = this.state.radio;
    if (this.el.radioStreamName) {
      this.el.radioStreamName.textContent = radio.streamName || 'AleLatina Radio';
    }

    // Show/hide config info
    const configInfo = this.el.radioConfigInfo;
    const playerCard = document.querySelector('.radio-player-card');
    if (configInfo && playerCard) {
      if (radio.streamUrl) {
        configInfo.style.display = 'none';
        playerCard.style.display = '';
      } else {
        configInfo.style.display = '';
        playerCard.style.display = 'none';
      }
    }

    this.renderPodcastList();
  },

  renderPodcastList() {
    const container = this.el.radioPodcastList;
    if (!container) return;
    const podcasts = this.state.radio.podcasts || [];

    if (podcasts.length === 0) {
      container.innerHTML = '<div class="gb-empty"><i class="fas fa-podcast"></i><p>Nessuna puntata disponibile.</p></div>';
      return;
    }

    container.innerHTML = podcasts.map(p => {
      const coverHtml = p.imageUrl
        ? '<img src="' + p.imageUrl + '" alt="' + this.escapeHtml(p.title) + '">'
        : '<i class="fas fa-microphone"></i>';
      const desc = p.description ? '<div class="radio-podcast-desc">' + this.escapeHtml(p.description) + '</div>' : '';
      const time = p.createdAt ? this.formatTime(p.createdAt) : '';
      const metaHtml = time ? '<div class="radio-podcast-meta">' + time + '</div>' : '';
      return '<div class="radio-podcast-card">' +
        '<div class="radio-podcast-cover">' + coverHtml + '</div>' +
        '<div class="radio-podcast-info">' +
          '<div class="radio-podcast-title">' + this.escapeHtml(p.title) + '</div>' +
          desc +
          metaHtml +
          '<button class="radio-podcast-play" onclick="APP.radioPlayPodcast(\'' + p.id + '\')"><i class="fas fa-play"></i> Ascolta</button>' +
        '</div>' +
      '</div>';
    }).join('');
  },

  radioPlayPodcast(podId) {
    const pod = this.state.radio.podcasts.find(p => p.id === podId);
    if (!pod || !pod.audioUrl) return;
    if (this.el.radioAudio) {
      this.el.radioAudio.src = pod.audioUrl;
      this.el.radioAudio.play().catch(() => {
        this.toast('Errore durante la riproduzione.', 'error');
      });
    }
  },

  adminSaveRadioConfig() {
    const url = this.el.adminStreamUrl.value.trim();
    const name = this.el.adminStreamName.value.trim();
    this.state.radio.streamUrl = url;
    if (name) this.state.radio.streamName = name;
    this.saveRadio();
    this.updateRadioBadge();
    this.renderRadioPage();
    this.toast('Configurazione radio salvata!', 'success');
  },

  renderAdminRadio() {
    const radio = this.state.radio;
    if (this.el.adminStreamUrl) this.el.adminStreamUrl.value = radio.streamUrl || '';
    if (this.el.adminStreamName) this.el.adminStreamName.value = radio.streamName || 'AleLatina Radio';
    this.renderAdminPodcastList();
  },

  renderAdminPodcastList() {
    const container = this.el.adminPodcastList;
    if (!container) return;
    const podcasts = this.state.radio.podcasts || [];

    if (podcasts.length === 0) {
      container.innerHTML = '<div class="gb-empty"><i class="fas fa-podcast"></i><p>Nessuna puntata.</p></div>';
      return;
    }

    container.innerHTML = podcasts.map(p => {
      const time = p.createdAt ? this.formatTime(p.createdAt) : '';
      return '<div class="admin-msg-item">' +
        '<div class="admin-msg-info">' +
          '<div class="admin-msg-text"><strong>' + this.escapeHtml(p.title) + '</strong></div>' +
          '<div class="admin-msg-meta">' + time + '</div>' +
        '</div>' +
        '<div class="admin-msg-actions">' +
          '<button class="btn btn-ghost btn-sm" onclick="APP.adminOpenEditPodcast(\'' + p.id + '\')"><i class="fas fa-pen"></i></button>' +
          '<button class="btn btn-danger btn-sm" onclick="APP.adminDeletePodcast(\'' + p.id + '\')"><i class="fas fa-trash"></i></button>' +
        '</div>' +
      '</div>';
    }).join('');
  },

  adminOpenAddPodcast() {
    this._editingPodcastId = null;
    if (this.el.podcastModalTitle) this.el.podcastModalTitle.innerHTML = '<i class="fas fa-podcast"></i> Nuova Puntata';
    if (this.el.pmTitle) this.el.pmTitle.value = '';
    if (this.el.pmDescription) this.el.pmDescription.value = '';
    if (this.el.pmAudioUrl) this.el.pmAudioUrl.value = '';
    if (this.el.pmImageUrl) this.el.pmImageUrl.value = '';
    if (this.el.pmPodcastError) this.el.pmPodcastError.textContent = '';
    if (this.el.podcastModal) this.el.podcastModal.style.display = '';
  },

  adminOpenEditPodcast(podId) {
    const pod = this.state.radio.podcasts.find(p => p.id === podId);
    if (!pod) return;
    this._editingPodcastId = podId;
    if (this.el.podcastModalTitle) this.el.podcastModalTitle.innerHTML = '<i class="fas fa-podcast"></i> Modifica Puntata';
    if (this.el.pmTitle) this.el.pmTitle.value = pod.title || '';
    if (this.el.pmDescription) this.el.pmDescription.value = pod.description || '';
    if (this.el.pmAudioUrl) this.el.pmAudioUrl.value = pod.audioUrl || '';
    if (this.el.pmImageUrl) this.el.pmImageUrl.value = pod.imageUrl || '';
    if (this.el.pmPodcastError) this.el.pmPodcastError.textContent = '';
    if (this.el.podcastModal) this.el.podcastModal.style.display = '';
  },

  adminSavePodcast() {
    const title = this.el.pmTitle.value.trim();
    const description = this.el.pmDescription.value.trim();
    const audioUrl = this.el.pmAudioUrl.value.trim();
    const imageUrl = this.el.pmImageUrl.value.trim();
    const errorEl = this.el.pmPodcastError;
    if (errorEl) errorEl.textContent = '';

    if (!title) {
      if (errorEl) errorEl.textContent = 'Il titolo è obbligatorio.';
      return;
    }
    if (!audioUrl) {
      if (errorEl) errorEl.textContent = "L'URL audio è obbligatorio.";
      return;
    }

    if (this._editingPodcastId) {
      const pod = this.state.radio.podcasts.find(p => p.id === this._editingPodcastId);
      if (!pod) return;
      pod.title = title;
      pod.description = description;
      pod.audioUrl = audioUrl;
      pod.imageUrl = imageUrl;
      this.saveRadio();
      this.adminClosePodcastModal();
      this.renderAdminPodcastList();
      this.renderPodcastList();
      this.toast('Puntata aggiornata!', 'success');
    } else {
      const pod = {
        id: 'pod_' + Date.now(),
        title,
        description,
        audioUrl,
        imageUrl,
        createdAt: Date.now(),
      };
      this.state.radio.podcasts.push(pod);
      this.saveRadio();
      this.adminClosePodcastModal();
      this.renderAdminPodcastList();
      this.renderPodcastList();
      this.toast('Puntata aggiunta!', 'success');
    }
  },

  adminClosePodcastModal() {
    this._editingPodcastId = null;
    if (this.el.podcastModal) this.el.podcastModal.style.display = 'none';
  },

  adminDeletePodcast(podId) {
    if (!confirm('Eliminare questa puntata?')) return;
    this.state.radio.podcasts = this.state.radio.podcasts.filter(p => p.id !== podId);
    this.saveRadio();
    this.renderAdminPodcastList();
    this.renderPodcastList();
    this.toast('Puntata eliminata.', 'info');
  },

  saveRadio() {
    localStorage.setItem('alelatina_radio', JSON.stringify(this.state.radio));
  },

  /* ---------- PROFILE ---------- */
  renderProfile() {
    const u = this.state.currentUser;
    if (!u) return;
    if (this.el.profileUsername) this.el.profileUsername.textContent = u.username;
    if (this.el.profileEmail) this.el.profileEmail.textContent = u.email;
    if (this.el.profileRole) this.el.profileRole.textContent = u.role === 'admin' ? 'Amministratore' : 'Tifoso';
    if (this.el.profileJoined) this.el.profileJoined.textContent = new Date(u.createdAt).toLocaleDateString('it-IT');
    if (this.el.profileAvatar) {
      if (u.avatar) {
        this.el.profileAvatar.innerHTML = '<img src="' + u.avatar + '" alt="">';
      } else {
        this.el.profileAvatar.textContent = u.username.charAt(0).toUpperCase();
      }
    }
    if (this.el.profileStatus) this.el.profileStatus.textContent = '';
  },

  handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 500000) {
      this.toast('Immagine troppo grande (max 500KB).', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      if (this.el.profileAvatar) {
        this.el.profileAvatar.innerHTML = '<img src="' + dataUrl + '" alt="">';
      }
      this._pendingAvatar = dataUrl;
      if (this.el.profileStatus) this.el.profileStatus.textContent = 'Foto caricata. Premi "Salva" per confermare.';
    };
    reader.readAsDataURL(file);
  },

  saveProfile() {
    const u = this.state.currentUser;
    if (!u) return;
    if (this._pendingAvatar) {
      u.avatar = this._pendingAvatar;
      delete this._pendingAvatar;
    }
    const idx = this.state.users.findIndex(x => x.id === u.id);
    if (idx > -1) this.state.users[idx] = u;
    this.saveUsers();
    // Refresh all avatar displays
    this.updateAllAvatars();
    this.toast('Profilo salvato!', 'success');
    if (this.el.profileStatus) this.el.profileStatus.textContent = '';
  },

  removeAvatar() {
    const u = this.state.currentUser;
    if (!u) return;
    if (!u.avatar && !this._pendingAvatar) return;
    u.avatar = null;
    delete this._pendingAvatar;
    const idx = this.state.users.findIndex(x => x.id === u.id);
    if (idx > -1) this.state.users[idx] = u;
    this.saveUsers();
    this.updateAllAvatars();
    this.renderProfile();
    this.toast('Foto profilo rimossa.', 'info');
  },

  updateAllAvatars() {
    const u = this.state.currentUser;
    if (!u) return;
    const initial = u.username.charAt(0).toUpperCase();
    const img = u.avatar
      ? '<img src="' + u.avatar + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">'
      : null;
    if (this.el.topAvatar) {
      if (img) { this.el.topAvatar.innerHTML = img; } else { this.el.topAvatar.textContent = initial; }
    }
    if (this.el.sidebarAvatar) {
      if (img) { this.el.sidebarAvatar.innerHTML = img; } else { this.el.sidebarAvatar.textContent = initial; }
    }
  },

  /* ---------- PRIVATE MESSAGES ---------- */
  renderInbox() {
    const u = this.state.currentUser;
    if (!u) return;
    this.el.pmConversation.style.display = 'none';
    this.el.pmInbox.style.display = '';
    this.state.pmRecipient = null;

    const msgs = this.state.privateMessages;
    // Group by other party
    const conversations = {};
    msgs.forEach(m => {
      const otherId = m.fromUserId === u.id ? m.toUserId : m.fromUserId;
      if (!conversations[otherId]) {
        conversations[otherId] = {
          otherId,
          otherUsername: m.fromUserId === u.id ? m.toUsername : m.fromUsername,
          messages: [],
          unread: 0,
        };
      }
      conversations[otherId].messages.push(m);
      if (m.toUserId === u.id && !m.read) {
        conversations[otherId].unread++;
      }
    });

    const convList = Object.values(conversations);
    convList.sort((a, b) => {
      const aLast = a.messages.reduce((max, m) => Math.max(max, m.createdAt), 0);
      const bLast = b.messages.reduce((max, m) => Math.max(max, m.createdAt), 0);
      return bLast - aLast;
    });

    const container = this.el.pmConversations;
    if (convList.length === 0) {
      container.innerHTML = '<div class="pm-empty"><i class="fas fa-envelope"></i><p>Nessun messaggio. Trova un tifoso nella sezione Membri per scrivergli!</p></div>';
      return;
    }

    container.innerHTML = convList.map(c => {
      const lastMsg = c.messages.reduce((a, b) => a.createdAt > b.createdAt ? a : b);
      const time = this.formatTime(lastMsg.createdAt);
      const preview = lastMsg.text.length > 60 ? lastMsg.text.slice(0, 60) + '...' : lastMsg.text;
      const otherUser = this.state.users.find(x => x.id === c.otherId);
      const avatarDisplay = otherUser && otherUser.avatar
        ? '<img src="' + otherUser.avatar + '" alt="">'
        : c.otherUsername.charAt(0).toUpperCase();
      const color = this.stringToColor(c.otherUsername);
      const unreadBadge = c.unread > 0 ? '<div class="pm-conv-unread">' + c.unread + '</div>' : '';
      return '<div class="pm-conv-card" onclick="APP.openConversation(\'' + c.otherId + '\')">' +
        '<div class="pm-conv-avatar" style="background:' + color + '">' + avatarDisplay + '</div>' +
        '<div class="pm-conv-info">' +
          '<div class="pm-conv-name">' + c.otherUsername + '</div>' +
          '<div class="pm-conv-preview">' + this.escapeHtml(preview) + '</div>' +
        '</div>' +
        '<div class="pm-conv-meta">' +
          '<div class="pm-conv-time">' + time + '</div>' +
          unreadBadge +
        '</div>' +
      '</div>';
    }).join('');
  },

  openConversation(otherUserId) {
    const u = this.state.currentUser;
    if (!u) return;
    const other = this.state.users.find(x => x.id === otherUserId);
    if (!other) return;

    this.state.pmRecipient = other;
    this.el.pmInbox.style.display = 'none';
    this.el.pmConversation.style.display = '';
    if (this.el.pmError) this.el.pmError.textContent = '';

    // Render header
    const avatarDisplay = other.avatar
      ? '<img src="' + other.avatar + '" alt="">'
      : other.username.charAt(0).toUpperCase();
    const color = this.stringToColor(other.username);
    if (this.el.pmConvHeader) {
      this.el.pmConvHeader.innerHTML =
        '<div class="pm-conv-header-avatar" style="background:' + color + '">' + avatarDisplay + '</div>' +
        '<div class="pm-conv-header-name">' + other.username + '</div>';
    }

    this.renderConversation();
  },

  showInbox() {
    this.el.pmConversation.style.display = 'none';
    this.el.pmInbox.style.display = '';
    this.state.pmRecipient = null;
    this.renderInbox();
  },

  renderConversation() {
    const u = this.state.currentUser;
    const other = this.state.pmRecipient;
    if (!u || !other) return;

    // Mark messages as read
    let changed = false;
    this.state.privateMessages.forEach(m => {
      if (m.toUserId === u.id && m.fromUserId === other.id && !m.read) {
        m.read = true;
        changed = true;
      }
    });
    if (changed) this.savePrivateMessages();

    const msgs = this.state.privateMessages
      .filter(m =>
        (m.fromUserId === u.id && m.toUserId === other.id) ||
        (m.fromUserId === other.id && m.toUserId === u.id)
      )
      .sort((a, b) => a.createdAt - b.createdAt);

    const container = this.el.pmConvMessages;
    if (msgs.length === 0) {
      container.innerHTML = '<div class="pm-empty"><i class="fas fa-comment"></i><p>Nessun messaggio in questa conversazione.</p></div>';
      return;
    }

    container.innerHTML = msgs.map(m => {
      const sent = m.fromUserId === u.id;
      const time = this.formatTime(m.createdAt);
      return '<div class="pm-msg ' + (sent ? 'pm-msg-sent' : 'pm-msg-received') + '">' +
        '<div>' + this.escapeHtml(m.text) + '</div>' +
        '<div class="pm-msg-time">' + time + '</div>' +
      '</div>';
    }).join('');

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
    this.updateMsgBadge();
  },

  sendPrivateMessage() {
    const u = this.state.currentUser;
    const other = this.state.pmRecipient;
    const input = this.el.pmMessageInput;
    if (!u || !other || !input) return;
    const text = input.value.trim();
    if (this.el.pmError) this.el.pmError.textContent = '';
    if (!text) {
      if (this.el.pmError) this.el.pmError.textContent = 'Scrivi un messaggio.';
      return;
    }
    const filtered = this.containsBadWords(text) ? this.filterBadWords(text) : text;

    const msg = {
      id: 'pm_' + Date.now(),
      fromUserId: u.id,
      fromUsername: u.username,
      toUserId: other.id,
      toUsername: other.username,
      text: filtered,
      originalText: text,
      createdAt: Date.now(),
      read: false,
    };

    this.state.privateMessages.push(msg);
    this.savePrivateMessages();
    input.value = '';
    this.renderConversation();
    this.toast('Messaggio inviato a ' + other.username + '!', 'success');
  },

  getUnreadCount() {
    const u = this.state.currentUser;
    if (!u) return 0;
    return this.state.privateMessages.filter(m => m.toUserId === u.id && !m.read).length;
  },

  updateMsgBadge() {
    const badge = this.el.sidebarMsgBadge;
    if (!badge) return;
    const count = this.getUnreadCount();
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /* ---------- PERSISTENCE ---------- */
  saveUsers() {
    localStorage.setItem('alelatina_users', JSON.stringify(this.state.users));
  },

  saveMessages() {
    localStorage.setItem('alelatina_messages', JSON.stringify(this.state.messages));
  },

  savePrivateMessages() {
    localStorage.setItem('alelatina_pms', JSON.stringify(this.state.privateMessages));
  },

  /* ---------- UTILITIES ---------- */
  formatTime(ts) {
    const date = new Date(ts);
    const now = new Date();
    const diff = now - date;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return 'Adesso';
    if (mins < 60) return mins + ' min fa';
    if (hours < 24) return hours + 'h fa';
    if (days < 7) return days + 'g fa';
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
  },

  stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return 'hsl(' + hue + ', 60%, 45%)';
  },

  /* ---------- TOAST ---------- */
  toast(message, type = 'info') {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-circle-exclamation',
      warning: 'fa-triangle-exclamation',
      info: 'fa-circle-info',
    };
    const el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + '"></i> ' + message;
    this.el.toastContainer.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(40px)';
      el.style.transition = 'all 0.3s ease';
      setTimeout(() => el.remove(), 300);
    }, 3500);
  },
};

/* ---------- START ---------- */
document.addEventListener('DOMContentLoaded', () => APP.init());
