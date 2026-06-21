const APP = {
  badWords: [
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
    'fuck', 'fucking', 'fucker', 'fuckers', 'fucked',
    'shit', 'bullshit', 'motherfucker',
    'asshole', 'bitch',
    'dio bestia', 'dio porco', 'dio cane', 'dio maiale',
    'dio schifoso', 'dio infame', 'dio merda', 'dio bastardo',
    'cristo bestia', 'cristo porco', 'cristo cane',
    'madonna puttana', 'madonna troia', 'madonna zoccola',
    'madonna bastarda', 'madonna porca',
    'ges\u00f9 porco', 'ges\u00f9 bestia', 'ges\u00f9 cane',
    'sangue di dio', 'sangue di cristo', 'sangue della madonna',
    'santiddio',
    'porco dio', 'porco cristo', 'porco ges\u00f9', 'porca madonna',
    'porca puttana', 'porco il dio', 'porco quel dio',
    'dio bono', 'dio bon', 'dio ladro',
    'bestemmia', 'bestemmiare', 'bestemmiatore',
    'dio', 'ges\u00f9', 'cristo', 'madonna',
  ],
  REACTIONS: [
    { type: 'like', emoji: '\uD83D\uDC4D', label: 'Mi piace' },
    { type: 'love', emoji: '\u2764\uFE0F', label: 'Amore' },
    { type: 'laugh', emoji: '\uD83D\uDE02', label: 'Risata' },
    { type: 'wow', emoji: '\uD83D\uDE2E', label: 'Wow' },
    { type: 'sad', emoji: '\uD83D\uDE22', label: 'Triste' },
    { type: 'angry', emoji: '\uD83D\uDE21', label: 'Arrabbiato' },
  ],
  religiousWords: ['dio', 'ges\u00f9', 'cristo', 'madonna', 'gesu', 'crist'],
  blasfemoPrefixes: ['porco', 'porca', 'cane', 'bestia', 'maiale', 'schifoso', 'infame', 'merda', 'bastardo', 'puttana', 'troia', 'zoccola', 'ladro', 'bono', 'bon'],
  blasfemoSuffixes: ['porco', 'porca', 'cane', 'bestia', 'maiale', 'schifoso', 'infame', 'merda', 'bastardo', 'puttana', 'troia', 'zoccola', 'ladro'],

  state: {
    currentUser: null,
    sidebarOpen: false,
    redirectAfterLogin: null,
    messagesUnsub: null,
    chatsUnsub: null,
    _registering: false,
    _editingArticleId: null,
    _editingMatchId: null,
    _editingUserId: null,
    _editingPodcastId: null,
    _editingChatPartnerId: null,
    _messagesConvUnsub: null,
    radioData: null,
    allMessages: [],
    messagesPage: 1,
    messagesPerPage: 15,
    avatarCache: {},
    _fetchedAuthors: {},
  },

  el: {},

  init() {
    this.cacheDOM();
    this.applyTheme();
    this.bindEvents();
    this.initAuth();
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
      topNotifBtn: $('topNotifBtn'),
      notifBadge: $('notifBadge'),
      homePage: $('homePage'),
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
      loginEmail: $('loginEmail'),
      loginPassword: $('loginPassword'),
      loginBtn: $('loginBtn'),
      loginError: $('loginError'),
      resetPwdBtn: $('resetPwdBtn'),
      regUsername: $('regUsername'),
      regEmail: $('regEmail'),
      regPassword: $('regPassword'),
      registerBtn: $('registerBtn'),
      regError: $('regError'),
      authTabs: qsa('.auth-tab'),
      gbMessageInput: $('gbMessageInput'),
      gbPostBtn: $('gbPostBtn'),
      gbNewPost: $('gbNewPost'),
      gbMessages: $('gbMessages'),
      gbPagination: $('gbPagination'),
      gbFilters: qsa('.gb-filter'),
      updateCharCount: $('updateCharCount'),
      membersSearch: $('membersSearch'),
      membersList: $('membersList'),
      sidebarItems: qsa('.sidebar-item'),
      adminTabs: qsa('.admin-tab'),
      adminMessages: $('adminMessages'),
      adminMsgList: $('adminMsgList'),
      adminMsgCount: $('adminMsgCount'),
      adminClearFiltered: $('adminClearFiltered'),
      adminUsers: $('adminUsers'),
      adminUserList: $('adminUserList'),
      adminUserCount: $('adminUserCount'),
      adminAddUserBtn: $('adminAddUserBtn'),
      adminRadio: $('adminRadio'),
      adminMixlrUser: $('adminMixlrUser'),
      adminStreamUrl: $('adminStreamUrl'),
      adminStreamName: $('adminStreamName'),
      adminSaveStreamBtn: $('adminSaveStreamBtn'),
      adminAddPodcastBtn: $('adminAddPodcastBtn'),
      adminPodcastList: $('adminPodcastList'),
      adminSchedDay: $('adminSchedDay'),
      adminSchedHour: $('adminSchedHour'),
      adminSchedTitle: $('adminSchedTitle'),
      adminSchedDesc: $('adminSchedDesc'),
      adminSchedTag: $('adminSchedTag'),
      adminAddScheduleBtn: $('adminAddScheduleBtn'),
      radioPage: $('radioPage'),
      radioMixlrEmbed: $('radioMixlrEmbed'),
      mixlrLink: $('mixlrLink'),
      radioDirectPlayer: $('radioDirectPlayer'),
      radioAudio: $('radioAudio'),
      radioStreamName: $('radioStreamName'),
      radioPlayBtn: $('radioPlayBtn'),
      radioStopBtn: $('radioStopBtn'),
      radioConfigInfo: $('radioConfigInfo'),
      radioLivePlayer: $('radioLivePlayer'),
      radioStatusBadge: $('radioStatusBadge'),
      radioStatusText: $('radioStatusText'),
      radioScheduleList: $('radioScheduleList'),
      radioScheduleSection: $('radioScheduleSection'),
      radioPodcastList: $('radioPodcastList'),
      sidebarRadioBadge: $('sidebarRadioBadge'),
      miniPlayer: $('miniPlayer'),
      miniPlayerName: $('miniPlayerName'),
      miniPlayerStop: $('miniPlayerStop'),
      editorialsPage: $('editorialsPage'),
      editorialsList: $('editorialsList'),
      articlePage: $('articlePage'),
      articleContent: $('articleContent'),
      articleBackBtn: $('articleBackBtn'),
      editorPanelPage: $('editorPanelPage'),
      editorPanelTitle: $('editorPanelTitle'),
      artTitle: $('artTitle'),
      artSubtitle: $('artSubtitle'),
      artCover: $('artCover'),
      artContent: $('artContent'),
      artPreview: $('artPreview'),
      artPreviewBtn: $('artPreviewBtn'),
      artError: $('artError'),
      artCancelBtn: $('artCancelBtn'),
      artSaveBtn: $('artSaveBtn'),
      sidebarEditorBtn: $('sidebarEditorBtn'),
      pagellePage: $('pagellePage'),
      pagelleMatchList: $('pagelleMatchList'),
      matchPage: $('matchPage'),
      matchPageTitle: $('matchPageTitle'),
      matchContent: $('matchContent'),
      matchBackBtn: $('matchBackBtn'),
      adminPagelle: $('adminPagelle'),
      adminMatchCount: $('adminMatchCount'),
      adminMatchList: $('adminMatchList'),
      adminAddMatchBtn: $('adminAddMatchBtn'),
      matchModal: $('matchModal'),
      matchModalTitle: $('matchModalTitle'),
      matchModalClose: $('matchModalClose'),
      mmOpponent: $('mmOpponent'),
      mmDate: $('mmDate'),
      mmResult: $('mmResult'),
      mmPlayers: $('mmPlayers'),
      mmError: $('mmError'),
      mmCancelBtn: $('mmCancelBtn'),
      mmSaveBtn: $('mmSaveBtn'),
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
      podcastModal: $('podcastModal'),
      podcastModalTitle: $('podcastModalTitle'),
      podcastModalClose: $('podcastModalClose'),
      pmTitle: $('pmTitle'),
      pmDescription: $('pmDescription'),
      pmAudioUrl: $('pmAudioUrl'),
      pmImageUrl: $('pmImageUrl'),
      pmPodcastError: $('pmPodcastError'),
      pmCancelBtn: $('pmCancelBtn'),
      pmSaveBtn: $('pmSaveBtn'),
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
      themeDarkBtn: $('themeDarkBtn'),
      themeLightBtn: $('themeLightBtn'),
      accentPicker: $('accentPicker'),
      messagesPage: $('messagesPage'),
      pmInbox: $('pmInbox'),
      pmConversations: $('pmConversations'),
      pmConversation: $('pmConversation'),
      pmBackBtn: $('pmBackBtn'),
      pmConvHeader: $('pmConvHeader'),
      pmConvMessages: $('pmConvMessages'),
      pmMessageInput: $('pmMessageInput'),
      pmSendBtn: $('pmSendBtn'),
      pmError: $('pmError'),
      sidebarMsgBadge: $('sidebarMsgBadge'),
      sidebarMessagesBtn: $('sidebarMessagesBtn'),
      toastContainer: $('toastContainer'),
    };
  },

  bindEvents() {
    this.el.authTabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchAuthTab(tab.dataset.form));
    });
    this.el.loginBtn.addEventListener('click', () => this.login());
    this.el.loginEmail.addEventListener('keydown', e => { if (e.key === 'Enter') this.login(); });
    this.el.loginPassword.addEventListener('keydown', e => { if (e.key === 'Enter') this.login(); });
    this.el.resetPwdBtn.addEventListener('click', () => this.sendResetEmail());
    this.el.registerBtn.addEventListener('click', () => this.register());
    this.el.regPassword.addEventListener('keydown', e => { if (e.key === 'Enter') this.register(); });
    this.el.gbFilters.forEach(f => {
      f.addEventListener('click', () => {
        this.el.gbFilters.forEach(x => x.classList.remove('active'));
        f.classList.add('active');
        this.state.currentFilter = f.dataset.filter;
        this.state.messagesPage = 1;
        this.renderMessages();
      });
    });
    this.el.membersSearch.addEventListener('input', () => this.renderMembers());
    this.el.menuToggle.addEventListener('click', () => this.toggleSidebar());
    this.el.sidebarClose.addEventListener('click', () => this.closeSidebar());
    this.el.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
    this.el.sidebarItems.forEach(item => {
      item.addEventListener('click', () => {
        this.closeSidebar();
        const page = item.dataset.page;
        if (page) this.navigateTo(page);
      });
    });
    if (this.el.topLoginBtn) this.el.topLoginBtn.addEventListener('click', () => this.showAuth());
    if (this.el.topRegisterBtn) this.el.topRegisterBtn.addEventListener('click', () => { this.showAuth(); this.switchAuthTab('register'); });
    if (this.el.sidebarLoginBtn) this.el.sidebarLoginBtn.addEventListener('click', () => { this.closeSidebar(); this.showAuth(); });
    this.el.logoutBtn.addEventListener('click', () => this.logout());
    if (this.el.topLogoutBtn) this.el.topLogoutBtn.addEventListener('click', () => this.logout());
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
        } else if (tab.dataset.atab === 'pagelle') {
          this.el.adminPagelle.classList.add('active');
          this.renderAdminMatches();
        }
      });
    });
    this.el.adminClearFiltered.addEventListener('click', () => this.adminClearFiltered());
    if (this.el.adminAddUserBtn) this.el.adminAddUserBtn.addEventListener('click', () => this.adminOpenCreateUser());
    if (this.el.userModalClose) this.el.userModalClose.addEventListener('click', () => this.adminCloseUserModal());
    if (this.el.umCancelBtn) this.el.umCancelBtn.addEventListener('click', () => this.adminCloseUserModal());
    if (this.el.umSaveBtn) this.el.umSaveBtn.addEventListener('click', () => this.adminSaveUser());
    if (this.el.userModal) this.el.userModal.addEventListener('click', e => {
      if (e.target === this.el.userModal) this.adminCloseUserModal();
    });
    if (this.el.articleBackBtn) this.el.articleBackBtn.addEventListener('click', () => this.navigateTo('editorials'));
    if (this.el.artPreviewBtn) this.el.artPreviewBtn.addEventListener('click', () => this.toggleArticlePreview());
    if (this.el.artSaveBtn) this.el.artSaveBtn.addEventListener('click', () => this.saveArticle());
    if (this.el.artCancelBtn) this.el.artCancelBtn.addEventListener('click', () => this.cancelArticle());
    if (this.el.matchBackBtn) this.el.matchBackBtn.addEventListener('click', () => this.navigateTo('pagelle'));
    if (this.el.adminAddMatchBtn) this.el.adminAddMatchBtn.addEventListener('click', () => this.adminOpenAddMatch());
    if (this.el.matchModalClose) this.el.matchModalClose.addEventListener('click', () => this.adminCloseMatchModal());
    if (this.el.mmCancelBtn) this.el.mmCancelBtn.addEventListener('click', () => this.adminCloseMatchModal());
    if (this.el.mmSaveBtn) this.el.mmSaveBtn.addEventListener('click', () => this.adminSaveMatch());
    if (this.el.matchModal) this.el.matchModal.addEventListener('click', e => {
      if (e.target === this.el.matchModal) this.adminCloseMatchModal();
    });
    if (this.el.radioPlayBtn) this.el.radioPlayBtn.addEventListener('click', () => this.radioPlay());
    if (this.el.radioStopBtn) this.el.radioStopBtn.addEventListener('click', () => this.radioStop());
    if (this.el.miniPlayerStop) this.el.miniPlayerStop.addEventListener('click', () => this.radioStop());
    if (this.el.adminSaveStreamBtn) this.el.adminSaveStreamBtn.addEventListener('click', () => this.adminSaveRadioConfig());
    if (this.el.adminAddPodcastBtn) this.el.adminAddPodcastBtn.addEventListener('click', () => this.adminOpenAddPodcast());
    if (this.el.adminAddScheduleBtn) this.el.adminAddScheduleBtn.addEventListener('click', () => this.adminAddScheduleItem());
    if (this.el.podcastModalClose) this.el.podcastModalClose.addEventListener('click', () => this.adminClosePodcastModal());
    if (this.el.pmCancelBtn) this.el.pmCancelBtn.addEventListener('click', () => this.adminClosePodcastModal());
    if (this.el.pmSaveBtn) this.el.pmSaveBtn.addEventListener('click', () => this.adminSavePodcast());
    if (this.el.podcastModal) this.el.podcastModal.addEventListener('click', e => {
      if (e.target === this.el.podcastModal) this.adminClosePodcastModal();
    });
    if (this.el.profileAvatarOverlay) this.el.profileAvatarOverlay.addEventListener('click', () => this.el.profileAvatarInput.click());
    if (this.el.themeDarkBtn) this.el.themeDarkBtn.addEventListener('click', () => this.setTheme('dark'));
    if (this.el.themeLightBtn) this.el.themeLightBtn.addEventListener('click', () => this.setTheme('light'));
    if (this.el.accentPicker) this.el.accentPicker.addEventListener('click', e => {
      const btn = e.target.closest('.accent-btn');
      if (btn) this.setAccentColor(btn.dataset.color);
    });
    if (this.el.profileAvatarInput) this.el.profileAvatarInput.addEventListener('change', e => this.handleAvatarUpload(e));
    if (this.el.profileSaveBtn) this.el.profileSaveBtn.addEventListener('click', () => this.saveProfile());
    if (this.el.profileRemoveBtn) this.el.profileRemoveBtn.addEventListener('click', () => this.removeAvatar());
    if (this.el.pmBackBtn) this.el.pmBackBtn.addEventListener('click', () => this.showInbox());
    if (this.el.pmSendBtn) this.el.pmSendBtn.addEventListener('click', () => this.sendPrivateMessage());
    if (this.el.pmMessageInput) this.el.pmMessageInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendPrivateMessage(); }
    });
    if (this.el.topNotifBtn) this.el.topNotifBtn.addEventListener('click', () => this.showNotifications());
  },

  initAuth() {
    auth.onAuthStateChanged(async user => {
      if (user) {
        if (this.state._registering) return;
        try {
          const doc = await db.collection('users').doc(user.uid).get();
          if (doc.exists) {
            this.state.currentUser = { id: user.uid, ...doc.data() };
          } else {
            this.state.currentUser = { id: user.uid, username: user.email.split('@')[0], email: user.email, role: 'user', avatar: '', createdAt: Date.now() };
            await db.collection('users').doc(user.uid).set(this.state.currentUser);
          }
          this.afterLogin();
        } catch (e) {
          console.error('Auth error:', e);
          this.state.currentUser = null;
          this.afterLogout();
        }
      } else {
        this.state.currentUser = null;
        this.afterLogout();
      }
    });
  },

  afterLogin() {
    const u = this.state.currentUser;
    if (!u) return;
    if (u.banned) {
      auth.signOut();
      this.toast('Account sospeso. Contatta l\'amministratore.', 'error');
      return;
    }
    if (this.el.topUsername) this.el.topUsername.textContent = u.username;
    if (this.el.topAvatar) {
      if (u.avatar) { this.el.topAvatar.innerHTML = '<img src="' + u.avatar + '" alt="">'; }
      else { this.el.topAvatar.textContent = u.username.charAt(0).toUpperCase(); }
    }
    if (this.el.topAuth) this.el.topAuth.style.display = 'none';
    if (this.el.topUser) this.el.topUser.style.display = '';
    if (this.el.sidebarUsername) this.el.sidebarUsername.textContent = u.username;
    if (this.el.sidebarAvatar) {
      if (u.avatar) { this.el.sidebarAvatar.innerHTML = '<img src="' + u.avatar + '" alt="">'; }
      else { this.el.sidebarAvatar.textContent = u.username.charAt(0).toUpperCase(); }
    }
    const roleMap = { admin: 'Amministratore', editor: 'Editor', user: 'Tifoso' };
    if (this.el.sidebarRole) this.el.sidebarRole.textContent = roleMap[u.role] || 'Tifoso';
    if (this.el.sidebarLoginBtn) this.el.sidebarLoginBtn.style.display = 'none';
    if (this.el.logoutBtn) this.el.logoutBtn.style.display = '';
    if (this.el.sidebarAdminBtn) this.el.sidebarAdminBtn.style.display = u.role === 'admin' ? '' : 'none';
    if (this.el.sidebarEditorBtn) this.el.sidebarEditorBtn.style.display = (u.role === 'editor' || u.role === 'admin') ? '' : 'none';
    this.updateMsgBadge();
    this.updateRadioBadge();
    this.startNotifsListener();
    if (this.state.redirectAfterLogin) {
      this.navigateTo(this.state.redirectAfterLogin);
      this.state.redirectAfterLogin = null;
    } else {
      this.navigateTo('guestbook');
    }
  },

  afterLogout() {
    this.stopMessagesListener();
    this.stopChatsListener();
    if (this.el.topUsername) this.el.topUsername.textContent = 'User';
    if (this.el.topAvatar) this.el.topAvatar.textContent = 'U';
    if (this.el.topAuth) this.el.topAuth.style.display = '';
    if (this.el.topUser) this.el.topUser.style.display = 'none';
    if (this.el.sidebarUsername) this.el.sidebarUsername.textContent = 'User';
    if (this.el.sidebarAvatar) this.el.sidebarAvatar.textContent = 'U';
    if (this.el.sidebarRole) this.el.sidebarRole.textContent = 'Tifoso';
    if (this.el.sidebarLoginBtn) this.el.sidebarLoginBtn.style.display = '';
    if (this.el.logoutBtn) this.el.logoutBtn.style.display = 'none';
    if (this.el.sidebarAdminBtn) this.el.sidebarAdminBtn.style.display = 'none';
    if (this.el.sidebarEditorBtn) this.el.sidebarEditorBtn.style.display = 'none';
    if (this.el.sidebarMsgBadge) this.el.sidebarMsgBadge.style.display = 'none';
    this.stopNotifsListener();
    this.navigateTo('home');
  },

  switchAuthTab(tab) {
    this.el.authTabs.forEach(t => t.classList.toggle('active', t.dataset.form === tab));
    document.getElementById('loginForm').classList.toggle('active', tab === 'login');
    document.getElementById('registerForm').classList.toggle('active', tab === 'register');
    if (this.el.loginError) this.el.loginError.textContent = '';
    if (this.el.regError) this.el.regError.textContent = '';
  },

  async login() {
    const email = this.el.loginEmail.value.trim();
    const password = this.el.loginPassword.value.trim();
    if (this.el.loginError) this.el.loginError.textContent = '';
    if (!email || !password) { if (this.el.loginError) this.el.loginError.textContent = 'Compila tutti i campi.'; return; }
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      if (this.el.loginError) this.el.loginError.textContent = e.code === 'auth/wrong-password' ? 'Password errata.' : e.code === 'auth/user-not-found' ? 'Email non trovata.' : 'Errore di accesso. Verifica le credenziali.';
    }
  },

  async sendResetEmail() {
    const email = this.el.loginEmail.value.trim();
    if (this.el.loginError) this.el.loginError.textContent = '';
    if (!email) { if (this.el.loginError) this.el.loginError.textContent = 'Inserisci la tua email.'; return; }
    try {
      await auth.sendPasswordResetEmail(email);
      this.el.loginError.textContent = 'Email di reset inviata! Controlla la tua casella.';
      this.el.loginError.style.color = '#4caf50';
    } catch (e) {
      this.el.loginError.style.color = '';
      if (this.el.loginError) this.el.loginError.textContent = e.code === 'auth/user-not-found' ? 'Email non trovata.' : 'Errore nell\'invio. Riprova.';
    }
  },

  async register() {
    const username = this.el.regUsername.value.trim();
    const email = this.el.regEmail.value.trim();
    const password = this.el.regPassword.value.trim();
    if (this.el.regError) this.el.regError.textContent = '';
    if (!username || !email || !password) { if (this.el.regError) this.el.regError.textContent = 'Compila tutti i campi.'; return; }
    if (password.length < 6) { if (this.el.regError) this.el.regError.textContent = 'La password deve essere di almeno 6 caratteri.'; return; }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) { if (this.el.regError) this.el.regError.textContent = 'Username: 3-20 caratteri, solo lettere, numeri e underscore.'; return; }
    this.state._registering = true;
    try {
      const userCred = await auth.createUserWithEmailAndPassword(email, password);
      try {
        const existing = await db.collection('users').where('username', '==', username).get();
        if (!existing.empty) {
          try { await userCred.user.delete(); } catch (_) {}
          if (this.el.regError) this.el.regError.textContent = 'Username gi\u00e0 in uso.';
          this.state._registering = false;
          return;
        }
      } catch (_) {}
      const allUsers = await db.collection('users').get();
      const isFirst = allUsers.size === 0;
      await db.collection('users').doc(userCred.user.uid).set({
        username, email, role: isFirst ? 'admin' : 'user', avatar: '', createdAt: Date.now()
      });
      this.state._registering = false;
      const doc = await db.collection('users').doc(userCred.user.uid).get();
      if (doc.exists) {
        this.state.currentUser = { id: userCred.user.uid, ...doc.data() };
      }
      this.afterLogin();
      this.toast('Registrato con successo! Bentornato ' + username, 'success');
    } catch (e) {
      this.state._registering = false;
      if (e.code === 'auth/email-already-in-use') {
        if (this.el.regError) this.el.regError.textContent = 'Email gi\u00e0 registrata.';
      } else {
        console.error('Register error:', e);
        if (this.el.regError) this.el.regError.textContent = 'Errore durante la registrazione. Riprova.';
      }
    }
  },

  async logout() {
    this.stopMessagesListener();
    this.stopChatsListener();
    await auth.signOut();
    this.toast('Arrivederci!', 'info');
  },

  navigateTo(page) {
    this.closeSidebar();
    const pages = ['homePage', 'authPage', 'guestbookPage', 'membersPage', 'rulesPage', 'adminPage', 'profilePage', 'messagesPage', 'radioPage', 'editorialsPage', 'articlePage', 'editorPanelPage', 'pagellePage', 'matchPage'];
    pages.forEach(p => { if (this.el[p]) this.el[p].style.display = 'none'; });
    if (this.el.sidebarItems) {
      this.el.sidebarItems.forEach(i => { i.classList.toggle('active', i.dataset.page === page); });
    }
    switch (page) {
      case 'home':
        this.showHome();
        break;
      case 'guestbook':
        this.el.guestbookPage.style.display = '';
        this.renderGuestbookUI();
        this.startMessagesListener();
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
        this.el.radioPage.style.display = '';
        this.renderRadioPage();
        break;
      case 'editorials':
        this.el.editorialsPage.style.display = '';
        this.renderEditorials();
        break;
      case 'article':
        this.el.articlePage.style.display = '';
        break;
      case 'editorPanel':
        if (this.state.currentUser && (this.state.currentUser.role === 'editor' || this.state.currentUser.role === 'admin')) {
          this.el.editorPanelPage.style.display = '';
          if (!this.state._editingArticleId && this.el.editorPanelTitle) this.el.editorPanelTitle.textContent = 'Nuovo Articolo';
        } else {
          this.navigateTo('guestbook');
        }
        break;
      case 'pagelle':
        this.el.pagellePage.style.display = '';
        this.renderPagelleList();
        break;
      case 'match':
        this.el.matchPage.style.display = '';
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

  toggleSidebar() {
    this.state.sidebarOpen = !this.state.sidebarOpen;
    this.el.sidebar.classList.toggle('open', this.state.sidebarOpen);
    this.el.sidebarOverlay.classList.toggle('show', this.state.sidebarOpen);
  },

  closeSidebar() { this.state.sidebarOpen = false; this.el.sidebar.classList.remove('open'); this.el.sidebarOverlay.classList.remove('show'); },

  /* ---------- SPLASH / HOME / AUTH ---------- */
  showSplash() {
    if (this.el.splash) {
      this.el.splash.style.display = '';
      setTimeout(() => {
        this.el.splash.classList.add('hide');
        setTimeout(() => {
          this.el.splash.style.display = 'none';
          if (this.el.topBar) this.el.topBar.style.display = '';
          if (this.el.sidebar) this.el.sidebar.style.display = '';
          if (this.state.currentUser) {
            this.navigateTo('guestbook');
          } else {
            this.navigateTo('home');
          }
        }, 600);
      }, 1500);
    }
  },

  showHome() {
    if (this.el.homePage) this.el.homePage.style.display = '';
  },

  showAuth() {
    this.state.redirectAfterLogin = this.getCurrentPage();
    this.closeSidebar();
    const pages = ['homePage', 'guestbookPage', 'membersPage', 'rulesPage', 'adminPage', 'profilePage', 'messagesPage', 'radioPage', 'editorialsPage', 'articlePage', 'editorPanelPage', 'pagellePage', 'matchPage'];
    pages.forEach(p => { if (this.el[p]) this.el[p].style.display = 'none'; });
    if (this.el.sidebarItems) {
      this.el.sidebarItems.forEach(i => { i.classList.remove('active'); });
    }
    if (this.el.authPage) this.el.authPage.style.display = '';
    if (!this.state.currentUser) {
      this.switchAuthTab('login');
    }
  },

  getCurrentPage() {
    const pages = ['guestbook', 'members', 'rules', 'radio', 'editorials', 'pagelle', 'messages'];
    for (const p of pages) {
      if (this.el[p + 'Page'] && this.el[p + 'Page'].style.display !== 'none') return p;
    }
    return 'guestbook';
  },

  enterAsGuest() { this.state.redirectAfterLogin = null; this.navigateTo('guestbook'); },
  enterAsUser() { this.showAuth(); },
  enterAsGuestPage(page) { this.state.redirectAfterLogin = null; this.navigateTo(page); },

  /* ---------- THEME ---------- */
  applyTheme() {
    const saved = localStorage.getItem('alelatina_theme') || 'dark';
    const accent = localStorage.getItem('alelatina_accent') || '#4da6ff';
    document.documentElement.setAttribute('data-theme', saved);
    document.documentElement.style.setProperty('--accent', accent);
    const darkBtn = this.el.themeDarkBtn, lightBtn = this.el.themeLightBtn;
    if (darkBtn) darkBtn.classList.toggle('active', saved === 'dark');
    if (lightBtn) lightBtn.classList.toggle('active', saved === 'light');
    if (this.el.accentPicker) {
      this.el.accentPicker.querySelectorAll('.accent-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.color === accent);
      });
    }
    document.querySelectorAll('.sidebar-theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.themeVal === saved);
    });
    document.querySelectorAll('.sidebar-accent-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.color === accent);
    });
    const logo = saved === 'light' ? 'images/logo_black.png' : 'images/logo_white.png';
    const topLogo = document.getElementById('topLogo');
    const sideLogo = document.getElementById('sideLogo');
    if (topLogo) topLogo.src = logo;
    if (sideLogo) sideLogo.src = logo;
  },

  setTheme(theme) {
    localStorage.setItem('alelatina_theme', theme);
    this.applyTheme();
  },

  setAccentColor(color) {
    localStorage.setItem('alelatina_accent', color);
    this.applyTheme();
  },

  /* ---------- TOAST ---------- */
  toast(msg, type) {
    const t = document.createElement('div');
    t.className = 'toast toast-' + (type || 'info');
    t.innerHTML = msg;
    this.el.toastContainer.appendChild(t);
    setTimeout(() => { t.classList.add('toast-fade'); setTimeout(() => t.remove(), 400); }, 3000);
  },

  /* ---------- HELPERS ---------- */
  escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  },

  filterBadWords(text) {
    let filtered = text;
    for (const w of this.badWords) {
      const regex = new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      filtered = filtered.replace(regex, '***');
    }
    return filtered;
  },

  checkBlasfemo(text) {
    const lower = text.toLowerCase();
    for (const rw of this.religiousWords) {
      if (lower.includes(rw)) {
        for (const p of this.blasfemoPrefixes) {
          if (lower.includes(p + ' ' + rw) || lower.includes(p + rw)) return true;
        }
        for (const s of this.blasfemoSuffixes) {
          if (lower.includes(rw + ' ' + s) || lower.includes(rw + s)) return true;
        }
      }
    }
    return false;
  },

  /* ---------- GUESTBOOK ---------- */
  startMessagesListener() {
    this.stopMessagesListener();
    this.state.messagesUnsub = db.collection('messages').orderBy('createdAt', 'desc').limit(200).onSnapshot(snapshot => {
      const messages = [];
      snapshot.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
      this.state.allMessages = messages;
      this.renderMessages();
    }, err => {
      console.error('Messages listener error:', err);
      const container = this.el.gbMessages;
      if (container) container.innerHTML = '<div class="gb-empty"><i class="fas fa-exclamation-triangle"></i><p>Errore caricamento messaggi: ' + this.escapeHtml(err.message) + '</p></div>';
    });
  },

  stopMessagesListener() {
    if (this.state.messagesUnsub) { this.state.messagesUnsub(); this.state.messagesUnsub = null; }
  },

  renderGuestbookUI() {
    if (!this.el.gbNewPost) return;
    if (this.state.currentUser) {
      const cu = this.state.currentUser;
      this.el.gbNewPost.innerHTML =
        '<div class="gb-post-form">' +
        '<div class="gb-post-user">' +
        '<div class="gb-post-avatar">' + (cu.avatar ? '<img src="' + cu.avatar + '" alt="">' : this.escapeHtml(cu.username.charAt(0).toUpperCase())) + '</div>' +
        '<span class="gb-post-username">' + this.escapeHtml(this.state.currentUser.username) + '</span>' +
        '</div>' +
        '<textarea id="gbMessageInput" class="gb-post-input" placeholder="Scrivi un messaggio sul Muro..." maxlength="500"></textarea>' +
        '<div class="gb-post-footer">' +
        '<span id="updateCharCount" class="gb-charcount">0/500</span>' +
        '<button id="gbPostBtn" class="btn btn-primary btn-sm"><i class="fas fa-paper-plane"></i> Pubblica</button>' +
        '</div></div>';
      this.el.gbPostBtn = document.getElementById('gbPostBtn');
      this.el.gbMessageInput = document.getElementById('gbMessageInput');
      this.el.updateCharCount = document.getElementById('updateCharCount');
      if (this.el.gbPostBtn) this.el.gbPostBtn.addEventListener('click', () => this.postMessage());
      if (this.el.gbMessageInput) {
        this.el.gbMessageInput.addEventListener('keydown', e => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.postMessage(); }
        });
        this.el.gbMessageInput.addEventListener('input', () => this.updateCharCount());
      }
    } else {
      this.el.gbNewPost.innerHTML =
        '<div class="gb-login-prompt">' +
        '<i class="fas fa-lock"></i>' +
        '<p><a href="#" onclick="APP.showAuth();return false">Accedi</a> o <a href="#" onclick="APP.showAuth();return false">registrati</a> per scrivere sul Muro</p>' +
        '</div>';
    }
  },

  renderMessageText(m) {
    let text = this.escapeHtml(m.text);
    text = text.replace(/@(\S+)/g, '<span class="gb-mention">@$1</span>');
    if (m.links && m.links.length > 0) {
      const cu = this.state.currentUser;
      const isMod = cu && (cu.role === 'admin' || cu.role === 'editor');
      text = text.replace(/\[link (\d+)\]/g, (match, idx) => {
        const link = m.links[parseInt(idx)];
        if (!link) return match;
        if (link.approved) {
          return '<a href="' + this.escapeHtml(link.url) + '" target="_blank" rel="noopener" class="gb-link-approved">' + this.escapeHtml(link.url) + '</a>';
        } else {
          let html = '<span class="gb-link-pending">' + this.escapeHtml(link.url) + ' <span class="gb-link-badge">in attesa</span></span>';
          if (isMod) {
            html += '<button class="gb-link-approve-btn" onclick="APP.approveLink(\'' + m.id + '\',' + idx + ')" title="Approva link"><i class="fas fa-check"></i></button>';
            html += '<button class="gb-link-reject-btn" onclick="APP.rejectLink(\'' + m.id + '\',' + idx + ')" title="Rimuovi link"><i class="fas fa-times"></i></button>';
          }
          return html;
        }
      });
    }
    return text;
  },

  async renderMessages() {
    if (!this.el.gbMessages) return;
    const container = this.el.gbMessages;
    const messages = this.state.allMessages;
    if (!messages || messages.length === 0) {
      container.innerHTML = '<div class="gb-empty"><i class="fas fa-message"></i><p>Nessun messaggio ancora. Sii il primo a scrivere!</p></div>';
      this.renderPagination(0);
      return;
    }
    const filter = this.state.currentFilter || 'all';
    let filtered = messages;
    if (filter === 'popular') filtered = [...messages].sort((a, b) => {
      const aTotal = a.reactions ? Object.values(a.reactions).reduce((s, v) => s + v, 0) : (a.likes || 0);
      const bTotal = b.reactions ? Object.values(b.reactions).reduce((s, v) => s + v, 0) : (b.likes || 0);
      return bTotal - aTotal;
    });
    const totalPages = Math.ceil(filtered.length / this.state.messagesPerPage) || 1;
    const page = Math.min(this.state.messagesPage, totalPages);
    this.state.messagesPage = page;
    const start = (page - 1) * this.state.messagesPerPage;
    const pageMessages = filtered.slice(start, start + this.state.messagesPerPage);
    const authorIds = [...new Set(pageMessages.filter(m => m.authorId).map(m => m.authorId))];
    const needsFetch = authorIds.filter(id => id && !(id in this.state._fetchedAuthors));
    if (needsFetch.length > 0) {
      try {
        await Promise.all(needsFetch.map(async id => {
          const doc = await db.collection('users').doc(id).get();
          if (doc.exists) {
            const data = doc.data();
            if (data.avatar) this.state.avatarCache[id] = data.avatar;
          }
          this.state._fetchedAuthors[id] = true;
        }));
      } catch (e) { /* ignore fetch errors */ }
    }
    container.innerHTML = pageMessages.map(m => {
      const time = m.createdAt ? new Date(m.createdAt).toLocaleString('it-IT') : '';
      const isOwner = this.state.currentUser && this.state.currentUser.id === m.authorId;
      const cu = this.state.currentUser;
      const avatarUrl = (cu && isOwner && cu.avatar) ? cu.avatar : (this.state.avatarCache[m.authorId] || m.authorAvatar || '');
      return '<div class="gb-message" data-id="' + m.id + '">' +
        '<div class="gb-msg-user">' +
        '<div class="gb-msg-avatar">' + (avatarUrl ? '<img src="' + avatarUrl + '" alt="">' : (m.authorName ? m.authorName.charAt(0).toUpperCase() : '?')) + '</div>' +
        '<div class="gb-msg-meta">' +
        '<strong class="gb-msg-name">' + this.escapeHtml(m.authorName || 'Anonimo') + '</strong>' +
        '<span class="gb-msg-time">' + time + '</span>' +
        '</div></div>' +
        '<div class="gb-msg-text">' + this.renderMessageText(m) + '</div>' +
        '<div class="gb-msg-actions">' +
        this.renderReactions(m) +
        (isOwner || (this.state.currentUser && this.state.currentUser.role === 'admin') ? '<button class="gb-like-btn gb-edit-btn" onclick="APP.editMessage(\'' + m.id + '\')"><i class="fas fa-pen"></i></button>' : '') +
        (isOwner || (this.state.currentUser && this.state.currentUser.role === 'admin') ? '<button class="gb-like-btn gb-del-btn" onclick="APP.deleteMessage(\'' + m.id + '\')"><i class="fas fa-trash"></i></button>' : '') +
        '</div></div>';
    }).join('');
    this.renderPagination(totalPages);
  },

  renderPagination(totalPages) {
    const container = this.el.gbPagination;
    if (!container) return;
    if (totalPages <= 1) { container.innerHTML = ''; return; }
    const page = this.state.messagesPage;
    let html = '<div class="gb-pagination">';
    html += '<button class="gb-page-btn" onclick="APP.goToPage(' + (page - 1) + ')"' + (page <= 1 ? ' disabled' : '') + '><i class="fas fa-chevron-left"></i></button>';
    for (let i = 1; i <= totalPages; i++) {
      html += '<button class="gb-page-btn' + (i === page ? ' active' : '') + '" onclick="APP.goToPage(' + i + ')">' + i + '</button>';
    }
    html += '<button class="gb-page-btn" onclick="APP.goToPage(' + (page + 1) + ')"' + (page >= totalPages ? ' disabled' : '') + '><i class="fas fa-chevron-right"></i></button>';
    html += '</div>';
    container.innerHTML = html;
  },

  renderReactions(m) {
    const reactions = m.reactions || {};
    const userReact = (this.state.currentUser && m.userReactions && m.userReactions[this.state.currentUser.id]) || null;
    return this.REACTIONS.map(r => {
      const count = reactions[r.type] || 0;
      const active = userReact === r.type ? ' active' : '';
      return '<span class="gb-reaction-group"><button class="gb-reaction' + active + '" onclick="APP.toggleReaction(\'' + r.type + '\',\'' + m.id + '\')" title="' + r.label + '">' +
        r.emoji + '</button>' +
        (count > 0 ? '<button class="gb-reaction-count" onclick="APP.showReactionUsers(\'' + r.type + '\',\'' + m.id + '\')" title="Vedi chi ha reagito">' + count + '</button>' : '') +
        '</span>';
    }).join('');
  },

  async toggleReaction(type, messageId) {
    if (!this.state.currentUser) { this.toast('Accedi per reagire!', 'warning'); return; }
    const uid = this.state.currentUser.id;
    try {
      const doc = await db.collection('messages').doc(messageId).get();
      if (!doc.exists) return;
      const data = doc.data();
      const reactions = data.reactions || {};
      const userReactions = data.userReactions || {};
      const oldType = userReactions[uid] || null;
      if (oldType === type) {
        reactions[type] = Math.max(0, (reactions[type] || 0) - 1);
        delete userReactions[uid];
      } else {
        if (oldType) {
          reactions[oldType] = Math.max(0, (reactions[oldType] || 0) - 1);
        }
        reactions[type] = (reactions[type] || 0) + 1;
        userReactions[uid] = type;
      }
      if (reactions[type] <= 0) delete reactions[type];
      await db.collection('messages').doc(messageId).update({ reactions, userReactions });
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  goToPage(page) {
    const totalPages = Math.ceil((this.state.allMessages || []).length / this.state.messagesPerPage) || 1;
    this.state.messagesPage = Math.max(1, Math.min(page, totalPages));
    this.renderMessages();
  },

  async showReactionUsers(type, messageId) {
    try {
      const doc = await db.collection('messages').doc(messageId).get();
      if (!doc.exists) return;
      const userReactions = doc.data().userReactions || {};
      const uids = Object.keys(userReactions).filter(uid => userReactions[uid] === type);
      if (uids.length === 0) return;
      const snapshots = await Promise.all(uids.map(uid => db.collection('users').doc(uid).get().catch(() => null)));
      const names = snapshots.map((s, i) => s && s.exists ? (s.data().username || 'Anonimo') : uids[i]);
      const label = this.REACTIONS.find(r => r.type === type);
      const emoji = label ? label.emoji : type;
      let html = '<div class="modal-overlay" onclick="APP.closeReactionUsers()"><div class="modal" onclick="event.stopPropagation()"><div class="modal-header"><h3>' + emoji + ' ' + names.length + '</h3><button class="modal-close" onclick="APP.closeReactionUsers()">&times;</button></div><div class="modal-body"><ul class="reaction-users-list">';
      names.forEach(n => { html += '<li>' + APP.escapeHtml(n) + '</li>'; });
      html += '</ul></div></div></div>';
      const el = document.createElement('div');
      el.id = 'reactionUsersModal';
      el.innerHTML = html;
      document.body.appendChild(el);
    } catch (e) { /* ignore */ }
  },

  closeReactionUsers() {
    const el = document.getElementById('reactionUsersModal');
    if (el) el.remove();
  },

  startNotifsListener() {
    this.stopNotifsListener();
    if (!this.state.currentUser) return;
    this._notifsUnsub = db.collection('notifications')
      .where('userId', '==', this.state.currentUser.id)
      .onSnapshot(snap => {
        let count = 0;
        const all = [];
        snap.forEach(d => { const data = d.data(); if (!data.read) count++; all.push(data); });
        const badge = this.el.notifBadge;
        if (badge) {
          if (count > 0) {
            badge.textContent = count > 99 ? '99+' : count;
            badge.style.display = '';
          } else {
            badge.style.display = 'none';
          }
        }
      });
  },

  stopNotifsListener() {
    if (this._notifsUnsub) { this._notifsUnsub(); this._notifsUnsub = null; }
  },

  async showNotifications() {
    if (!this.state.currentUser) return;
    const existing = document.getElementById('notifModal');
    if (existing) existing.remove();
    try {
      const snap = await db.collection('notifications')
        .where('userId', '==', this.state.currentUser.id)
        .get();
      const notifs = [];
      snap.forEach(d => notifs.push({ id: d.id, ...d.data() }));
      notifs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      let html = '<div class="modal-overlay" onclick="APP.closeNotifModal()"><div class="modal modal-notif" onclick="event.stopPropagation()">' +
        '<div class="modal-header"><h3><i class="fas fa-bell"></i> Notifiche</h3><button class="modal-close" onclick="APP.closeNotifModal()">&times;</button></div>' +
        '<div class="modal-body">';
      if (notifs.length === 0) {
        html += '<div class="radio-empty-state"><i class="fas fa-bell-slash"></i><p>Nessuna notifica.</p></div>';
      } else {
        html += '<ul class="notif-list">';
        for (const n of notifs) {
          const time = n.createdAt ? new Date(n.createdAt).toLocaleString('it-IT') : '';
          html += '<li class="notif-item' + (n.read ? '' : ' notif-unread') + '">' +
            '<div class="notif-icon"><i class="fas fa-at"></i></div>' +
            '<div class="notif-body">' +
            '<div class="notif-text"><strong>' + this.escapeHtml(n.fromName) + '</strong> ti ha menzionato nel muro:</div>' +
            '<div class="notif-preview">' + this.escapeHtml(n.text) + '</div>' +
            '<div class="notif-time">' + time + '</div>' +
            '</div>' +
            '</li>';
        }
        html += '</ul>';
      }
      html += '</div></div></div>';
      const el = document.createElement('div');
      el.id = 'notifModal';
      el.innerHTML = html;
      document.body.appendChild(el);
      const unreadIds = notifs.filter(n => !n.read).map(n => n.id);
      if (unreadIds.length > 0) {
        const batch = db.batch();
        unreadIds.forEach(id => batch.update(db.collection('notifications').doc(id), { read: true }));
        await batch.commit();
      }
    } catch (e) { this.toast('Errore nel caricamento notifiche.', 'error'); }
  },

  closeNotifModal() {

  async postMessage() {
    if (!this.state.currentUser) { this.toast('Accedi per scrivere!', 'warning'); return; }
    const input = this.el.gbMessageInput;
    if (!input) return;
    const text = input.value.trim();
    if (!text) { this.toast('Scrivi un messaggio!', 'warning'); return; }
    if (this.checkBlasfemo(text)) { this.toast('Messaggio blasfemo non consentito.', 'error'); return; }
    const filtered = this.filterBadWords(text);
    const urlRegex = /https?:\/\/[^\s]+/g;
    const urls = filtered.match(urlRegex);
    let finalText = filtered;
    let links = [];
    if (urls) {
      const unique = [...new Set(urls)];
      const isMod = this.state.currentUser.role === 'admin' || this.state.currentUser.role === 'editor';
      links = unique.map(u => ({ url: u, approved: isMod }));
      let idx = 0;
      finalText = finalText.replace(urlRegex, () => {
        const n = idx++;
        return '[link ' + n + ']';
      });
      if (links.length > 0 && !isMod) {
        this.toast('I link saranno visibili dopo l\'approvazione di un amministratore.', 'info');
      }
    }
    try {
      const msgData = {
        text: finalText,
        authorId: this.state.currentUser.id,
        authorName: this.state.currentUser.username,
        authorAvatar: this.state.currentUser.avatar || '',
        reactions: {},
        userReactions: {},
        createdAt: Date.now(),
      };
      if (links.length > 0) msgData.links = links;
      const msgRef = await db.collection('messages').add(msgData);
      const mentions = filtered.match(/@(\S+)/g);
      if (mentions) {
        const unique = [...new Set(mentions.map(m => m.slice(1).toLowerCase()))];
        const usersSnap = await db.collection('users').get();
        const users = [];
        usersSnap.forEach(d => users.push({ id: d.id, ...d.data() }));
        for (const name of unique) {
          const target = users.find(u => u.username && u.username.toLowerCase() === name);
          if (target && target.id !== this.state.currentUser.id) {
            await db.collection('notifications').add({
              userId: target.id,
              type: 'mention',
              messageId: msgRef.id,
              fromName: this.state.currentUser.username,
              fromId: this.state.currentUser.id,
              text: filtered.length > 80 ? filtered.slice(0, 80) + '...' : filtered,
              read: false,
              createdAt: Date.now(),
            });
          }
        }
      }
      input.value = '';
      this.updateCharCount();
    } catch (e) {
      this.toast('Errore durante l\'invio.', 'error');
    }
  },

  // replaced by toggleReaction

  async deleteMessage(messageId) {
    if (!this.state.currentUser) return;
    if (!confirm('Eliminare questo messaggio?')) return;
    try {
      await db.collection('messages').doc(messageId).delete();
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  async approveLink(messageId, linkIndex) {
    if (!this.state.currentUser) return;
    const role = this.state.currentUser.role;
    if (role !== 'admin' && role !== 'editor') { this.toast('Non autorizzato.', 'error'); return; }
    try {
      const doc = await db.collection('messages').doc(messageId).get();
      if (!doc.exists) return;
      const links = doc.data().links || [];
      if (!links[linkIndex]) return;
      links[linkIndex].approved = true;
      await db.collection('messages').doc(messageId).update({ links });
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  async rejectLink(messageId, linkIndex) {
    if (!this.state.currentUser) return;
    const role = this.state.currentUser.role;
    if (role !== 'admin' && role !== 'editor') { this.toast('Non autorizzato.', 'error'); return; }
    try {
      const doc = await db.collection('messages').doc(messageId).get();
      if (!doc.exists) return;
      const links = doc.data().links || [];
      if (!links[linkIndex]) return;
      links.splice(linkIndex, 1);
      await db.collection('messages').doc(messageId).update({ links });
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  editMessage(messageId) {
    const card = this.el.gbMessages.querySelector('.gb-message[data-id="' + messageId + '"]');
    if (!card) return;
    const textEl = card.querySelector('.gb-msg-text');
    const actions = card.querySelector('.gb-msg-actions');
    if (!textEl || !actions) return;
    const originalText = textEl.textContent;
    textEl.innerHTML = '<textarea class="gb-edit-textarea" maxlength="500">' + this.escapeHtml(originalText) + '</textarea>';
    const btnHtml = '<button class="gb-like-btn gb-save-btn" onclick="APP.saveEditMessage(\'' + messageId + '\')"><i class="fas fa-check"></i></button>' +
      '<button class="gb-like-btn gb-cancel-btn" onclick="APP.cancelEditMessage(\'' + messageId + '\')"><i class="fas fa-times"></i></button>';
    const editBtn = actions.querySelector('.gb-edit-btn');
    const delBtn = actions.querySelector('.gb-del-btn');
    if (editBtn) editBtn.style.display = 'none';
    if (delBtn) delBtn.style.display = 'none';
    const existing = actions.querySelector('.gb-edit-save-group');
    if (existing) existing.remove();
    const group = document.createElement('span');
    group.className = 'gb-edit-save-group';
    group.innerHTML = btnHtml;
    actions.appendChild(group);
    const ta = textEl.querySelector('textarea');
    if (ta) { ta.focus(); ta.select(); }
  },

  cancelEditMessage(messageId) {
    this.renderMessages();
  },

  async saveEditMessage(messageId) {
    const card = this.el.gbMessages.querySelector('.gb-message[data-id="' + messageId + '"]');
    if (!card) return;
    const ta = card.querySelector('.gb-edit-textarea');
    if (!ta) return;
    const newText = ta.value.trim();
    if (!newText) { this.toast('Il messaggio non può essere vuoto.', 'warning'); return; }
    try {
      await db.collection('messages').doc(messageId).update({ text: newText, editedAt: Date.now() });
      this.toast('Messaggio modificato!', 'success');
    } catch (e) { this.toast('Errore nel salvataggio.', 'error'); }
  },

  updateCharCount() {
    const input = this.el.gbMessageInput;
    const count = this.el.updateCharCount;
    if (input && count) count.textContent = input.value.length + '/500';
  },

  /* ---------- MEMBERS ---------- */
  async renderMembers() {
    if (!this.el.membersList) return;
    const query = (this.el.membersSearch ? this.el.membersSearch.value.toLowerCase() : '');
    try {
      const snapshot = await db.collection('users').orderBy('username').get();
      let users = [];
      snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
      if (query) users = users.filter(u => u.username && u.username.toLowerCase().includes(query));
      if (users.length === 0) {
        this.el.membersList.innerHTML = '<div class="gb-empty"><i class="fas fa-users"></i><p>Nessun tifoso trovato.</p></div>';
        return;
      }
      this.el.membersList.innerHTML = users.map(u => {
        const initial = u.username ? u.username.charAt(0).toUpperCase() : '?';
        const roleLabel = u.role === 'admin' ? 'Admin' : u.role === 'editor' ? 'Editor' : 'Tifoso';
        const roleClass = 'member-role-' + (u.role || 'user');
        return '<div class="member-card">' +
          '<div class="member-avatar">' + (u.avatar ? '<img src="' + u.avatar + '" alt="">' : initial) + '</div>' +
          '<div class="member-info"><div class="member-name">' + this.escapeHtml(u.username || '?') + '</div><div class="member-role ' + roleClass + '">' + roleLabel + '</div></div>' +
          (this.state.currentUser && u.id !== this.state.currentUser.id ? '<button class="btn btn-ghost btn-sm" onclick="APP.startPrivateChat(\'' + u.id + '\')"><i class="fas fa-envelope"></i></button>' : '') +
          '</div>';
      }).join('');
    } catch (e) { console.error('Members error:', e); }
  },

  /* ---------- RADIO ---------- */
  async renderRadioPage() {
    try {
      const doc = await db.collection('radio').doc('config').get();
      this.state.radioData = doc.exists ? doc.data() : { streamUrl: '', streamName: 'Radio aleLatina', mixlrUsername: '', podcasts: [], schedule: [] };
    } catch (e) {
      this.state.radioData = { streamUrl: '', streamName: 'Radio aleLatina', mixlrUsername: '', podcasts: [], schedule: [] };
    }
    const r = this.state.radioData;
    if (!r) return;
    if (this.el.radioStreamName) this.el.radioStreamName.textContent = r.streamName || 'Radio aleLatina';
    const hasLive = r.mixlrUsername || r.streamUrl;
    if (this.el.radioConfigInfo) this.el.radioConfigInfo.style.display = hasLive ? 'none' : '';
    if (this.el.radioLivePlayer) this.el.radioLivePlayer.style.display = hasLive ? '' : 'none';
    if (this.el.radioMixlrEmbed) {
      this.el.radioMixlrEmbed.style.display = r.mixlrUsername ? '' : 'none';
      if (r.mixlrUsername && this.el.mixlrLink) this.el.mixlrLink.href = 'https://mixlr.com/' + encodeURIComponent(r.mixlrUsername);
    }
    if (this.el.radioDirectPlayer) this.el.radioDirectPlayer.style.display = (!r.mixlrUsername && r.streamUrl) ? '' : 'none';
    if (this.el.radioAudio && r.streamUrl && !r.mixlrUsername) this.el.radioAudio.src = r.streamUrl;
    if (this.el.radioStatusBadge) {
      if (hasLive) { this.el.radioStatusBadge.classList.add('live'); if (this.el.radioStatusText) this.el.radioStatusText.textContent = 'In diretta'; }
      else { this.el.radioStatusBadge.classList.remove('live'); if (this.el.radioStatusText) this.el.radioStatusText.textContent = 'Offline'; }
    }
    if (hasLive) this.showMiniPlayer();
    this.renderSchedule();
    this.renderPodcasts();
    this.updateRadioBadge();
  },

  radioPlay() {
    const r = this.state.radioData;
    if (!r) return;
    if (r.mixlrUsername) {
      if (this.el.radioMixlrEmbed) this.el.radioMixlrEmbed.style.display = '';
      if (this.el.radioDirectPlayer) this.el.radioDirectPlayer.style.display = 'none';
      window.open('https://mixlr.com/' + encodeURIComponent(r.mixlrUsername), '_blank');
    } else if (r.streamUrl) {
      const audio = this.el.radioAudio;
      if (audio) { audio.play(); }
    } else {
      this.toast('Nessuna diretta configurata.', 'warning');
      return;
    }
    this.showMiniPlayer();
  },

  radioStop() {
    if (this.el.radioMixlrEmbed) this.el.radioMixlrEmbed.style.display = 'none';
    const audio = this.el.radioAudio;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    this.hideMiniPlayer();
    this.toast('Radio fermata.', 'info');
  },

  showMiniPlayer() {
    if (!this.el.miniPlayer) return;
    const name = (this.state.radioData && this.state.radioData.streamName) || 'Radio aleLatina';
    if (this.el.miniPlayerName) this.el.miniPlayerName.textContent = name;
    this.el.miniPlayer.style.display = '';
    document.body.classList.add('has-mini-player');
  },

  hideMiniPlayer() {
    if (!this.el.miniPlayer) return;
    this.el.miniPlayer.style.display = 'none';
    document.body.classList.remove('has-mini-player');
  },

  updateRadioBadge() {
    if (!this.state.radioData || (!this.state.radioData.mixlrUsername && !this.state.radioData.streamUrl)) {
      if (this.el.sidebarRadioBadge) this.el.sidebarRadioBadge.style.display = 'none';
    }
  },

  renderSchedule() {
    const container = this.el.radioScheduleList;
    const section = this.el.radioScheduleSection;
    if (!container || !section) return;
    const schedule = this.state.radioData && this.state.radioData.schedule ? this.state.radioData.schedule : [];
    if (schedule.length === 0) { section.style.display = 'none'; return; }
    section.style.display = '';
    container.innerHTML = schedule.map(s => {
      return '<div class="radio-schedule-card">' +
        '<div class="radio-schedule-time"><span class="day">' + this.escapeHtml(s.day || '') + '</span><span class="hour">' + this.escapeHtml(s.hour || '') + '</span></div>' +
        '<div class="radio-schedule-info"><div class="title">' + this.escapeHtml(s.title || '') + '</div>' +
        (s.description ? '<div class="desc">' + this.escapeHtml(s.description) + '</div>' : '') + '</div>' +
        (s.tag ? '<div class="radio-schedule-tag">' + this.escapeHtml(s.tag) + '</div>' : '') +
        '</div>';
    }).join('');
  },

  async renderPodcasts() {
    if (!this.el.radioPodcastList) return;
    const podcasts = this.state.radioData && this.state.radioData.podcasts ? this.state.radioData.podcasts : [];
    if (podcasts.length === 0) {
      this.el.radioPodcastList.innerHTML = '<div class="gb-empty"><i class="fas fa-podcast"></i><p>Nessun podcast ancora.</p></div>';
      return;
    }
    this.el.radioPodcastList.innerHTML = [...podcasts].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).map(p => {
      const dateStr = p.createdAt ? new Date(p.createdAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
      return '<div class="radio-podcast-card">' +
        (p.imageUrl ? '<div class="radio-podcast-cover"><img src="' + p.imageUrl + '" alt=""></div>' : '<div class="radio-podcast-cover"><i class="fas fa-podcast"></i></div>') +
        '<div class="radio-podcast-info"><div class="radio-podcast-title">' + this.escapeHtml(p.title || '') + '</div>' +
        (p.description ? '<div class="radio-podcast-desc">' + this.escapeHtml(p.description) + '</div>' : '') +
        (dateStr ? '<div class="radio-podcast-meta">' + dateStr + '</div>' : '') +
        (p.audioUrl ? (p.audioUrl.indexOf('mixlr.com') !== -1 ? '<a href="' + p.audioUrl + '" target="_blank" class="radio-podcast-play" style="display:inline-flex;margin-top:8px"><i class="fas fa-external-link-alt"></i> Ascolta su Mixlr</a>' : '<audio controls style="width:100%;margin-top:8px"><source src="' + p.audioUrl + '"></audio>') : '') +
        '</div></div>';
    }).join('');
  },

  extractMixlrId(url) {
    const m = url.match(/(?:recording\/)?(\d+)/);
    return m ? m[1] : url;
  },

  /* ---------- EDITORIALS ---------- */
  async renderEditorials() {
    if (!this.el.editorialsList) return;
    try {
      const snapshot = await db.collection('articles').orderBy('createdAt', 'desc').get();
      const articles = [];
      snapshot.forEach(doc => articles.push({ id: doc.id, ...doc.data() }));
      if (articles.length === 0) {
        this.el.editorialsList.innerHTML = '<div class="gb-empty"><i class="fas fa-newspaper"></i><p>Nessun editoriale ancora. Il primo arriver\u00e0 presto!</p></div>';
        return;
      }
      const canEdit = this.state.currentUser && (this.state.currentUser.role === 'editor' || this.state.currentUser.role === 'admin');
      this.el.editorialsList.innerHTML = articles.map(a => {
        const dateStr = a.createdAt ? new Date(a.createdAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
        const editBtn = canEdit ? '<button class="article-edit-btn" onclick="event.stopPropagation();APP.editArticle(\'' + a.id + '\')"><i class="fas fa-pen"></i></button>' : '';
        return '<div class="article-card" onclick="APP.openArticle(\'' + a.id + '\')">' +
          (a.cover ? '<img src="' + a.cover + '" alt="" class="article-card-img">' : '<div class="article-card-img article-card-img-placeholder"><i class="fas fa-newspaper"></i></div>') +
          '<div class="article-card-body"><h3>' + this.escapeHtml(a.title) + '</h3>' +
          (a.subtitle ? '<p>' + this.escapeHtml(a.subtitle) + '</p>' : '') +
          '<div class="article-card-meta">' + dateStr + ' \u00B7 ' + this.escapeHtml(a.authorName || 'Anonimo') + '</div>' + editBtn +
          '</div></div>';
      }).join('');
    } catch (e) { console.error('Editorials error:', e); }
  },

  async openArticle(articleId) {
    try {
      const doc = await db.collection('articles').doc(articleId).get();
      if (!doc.exists) return;
      const a = doc.data();
      this.navigateTo('article');
      if (this.el.articleContent) {
        const dateStr = a.createdAt ? new Date(a.createdAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
        this.el.articleContent.innerHTML =
          '<div class="article-full-img">' + (a.cover ? '<img src="' + a.cover + '">' : '') + '</div>' +
          '<h1>' + this.escapeHtml(a.title) + '</h1>' +
          (a.subtitle ? '<p class="article-full-sub">' + this.escapeHtml(a.subtitle) + '</p>' : '') +
          '<div class="article-full-meta">' + dateStr + ' \u00B7 ' + this.escapeHtml(a.authorName || 'Anonimo') + '</div>' +
          '<div class="article-full-body">' + a.content + '</div>';
      }
    } catch (e) { this.toast('Errore nel caricamento dell\'articolo.', 'error'); }
  },

  async editArticle(articleId) {
    try {
      const doc = await db.collection('articles').doc(articleId).get();
      if (!doc.exists) return;
      const a = doc.data();
      this.state._editingArticleId = articleId;
      this.el.artTitle.value = a.title || '';
      this.el.artSubtitle.value = a.subtitle || '';
      this.el.artCover.value = a.cover || '';
      this.el.artContent.value = a.content || '';
      if (this.el.editorPanelTitle) this.el.editorPanelTitle.textContent = 'Modifica Articolo';
      this.navigateTo('editorPanel');
    } catch (e) { this.toast('Errore nel caricamento dell\'articolo.', 'error'); }
  },

  async saveArticle() {
    const title = this.el.artTitle.value.trim();
    const subtitle = this.el.artSubtitle.value.trim();
    const cover = this.el.artCover.value.trim();
    const content = this.el.artContent.value.trim();
    if (!this.state.currentUser) return;
    if (this.el.artError) this.el.artError.textContent = '';
    if (!title || !content) { if (this.el.artError) this.el.artError.textContent = 'Titolo e contenuto obbligatori.'; return; }
    try {
      if (this.state._editingArticleId) {
        await db.collection('articles').doc(this.state._editingArticleId).update({ title, subtitle, cover, content });
      } else {
        await db.collection('articles').add({
          title, subtitle, cover, content,
          authorId: this.state.currentUser.id,
          authorName: this.state.currentUser.username,
          createdAt: Date.now(),
        });
      }
      this.state._editingArticleId = null;
      this.el.artTitle.value = '';
      this.el.artSubtitle.value = '';
      this.el.artCover.value = '';
      this.el.artContent.value = '';
      this.toast('Articolo pubblicato!', 'success');
      this.navigateTo('editorials');
    } catch (e) { if (this.el.artError) this.el.artError.textContent = 'Errore durante il salvataggio.'; }
  },

  cancelArticle() {
    if (this.el.artTitle) this.el.artTitle.value = '';
    if (this.el.artSubtitle) this.el.artSubtitle.value = '';
    if (this.el.artCover) this.el.artCover.value = '';
    if (this.el.artContent) this.el.artContent.value = '';
    if (this.el.artPreview) this.el.artPreview.style.display = 'none';
    this.state._editingArticleId = null;
    this.navigateTo('editorials');
  },

  toggleArticlePreview() {
    const preview = this.el.artPreview;
    const content = this.el.artContent;
    if (!preview || !content) return;
    if (preview.style.display === 'none') {
      preview.style.display = 'block';
      preview.innerHTML = content.value;
    } else {
      preview.style.display = 'none';
    }
  },

  /* ---------- PAGELLE ---------- */
  async renderPagelleList() {
    const container = this.el.pagelleMatchList;
    if (!container) return;
    try {
      const snapshot = await db.collection('matches').orderBy('createdAt', 'desc').get();
      const matches = [];
      snapshot.forEach(doc => matches.push({ id: doc.id, ...doc.data() }));
      if (matches.length === 0) {
        container.innerHTML = '<div class="gb-empty"><i class="fas fa-futbol"></i><p>Nessuna partita ancora. La prima pagella arriver\u00e0 presto!</p></div>';
        return;
      }
      container.innerHTML = matches.map(m => {
        const dateStr = m.date ? new Date(m.date + 'T00:00:00').toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
        const playerCount = m.players ? m.players.length : 0;
        const totalVotes = m.players ? m.players.reduce((sum, p) => sum + (p.ratings ? Object.keys(p.ratings).length : 0), 0) : 0;
        const withAvg = (m.players || []).map(p => {
          const ratings = p.ratings ? Object.values(p.ratings) : [];
          const avg = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
          return { ...p, avg, voteCount: ratings.length };
        }).filter(p => p.voteCount >= 1);
        let topHtml = '', flopHtml = '';
        if (withAvg.length > 0) {
          const top = withAvg.reduce((a, b) => a.avg > b.avg ? a : b);
          const flop = withAvg.reduce((a, b) => a.avg < b.avg ? a : b);
          topHtml = '<div class="pagelle-tf-item top"><span class="pagelle-tf-label top-label"><i class="fas fa-crown"></i> Top</span><span class="pagelle-tf-name">' + this.escapeHtml(top.name) + '</span><span class="pagelle-tf-score top-score">' + top.avg.toFixed(1) + '</span></div>';
          flopHtml = '<div class="pagelle-tf-item flop"><span class="pagelle-tf-label flop-label"><i class="fas fa-poop"></i> Flop</span><span class="pagelle-tf-name">' + this.escapeHtml(flop.name) + '</span><span class="pagelle-tf-score flop-score">' + flop.avg.toFixed(1) + '</span></div>';
        }
        return '<div class="pagelle-match-card" onclick="APP.openMatch(\'' + m.id + '\')">' +
          '<div class="pagelle-match-header">' +
          '<div class="pagelle-match-opponent">' + this.escapeHtml(m.opponent) + '</div>' +
          (m.result ? '<div class="pagelle-match-result">' + this.escapeHtml(m.result) + '</div>' : '') +
          '</div>' +
          '<div class="pagelle-match-meta">' + dateStr + ' \u00B7 ' + playerCount + ' giocatori \u00B7 ' + totalVotes + ' voti</div>' +
          (topHtml || flopHtml ? '<div class="pagelle-match-topflop">' + topHtml + flopHtml + '</div>' : '<div style="font-size:12px;color:var(--text-muted);font-style:italic">Ancora nessun voto</div>') +
          '</div>';
      }).join('');
    } catch (e) { console.error('Pagelle error:', e); }
  },

  async openMatch(matchId) {
    try {
      const doc = await db.collection('matches').doc(matchId).get();
      if (!doc.exists) return;
      const m = { id: doc.id, ...doc.data() };
      this.navigateTo('match');
      const container = this.el.matchContent;
      if (!container) return;
      if (this.el.matchPageTitle) this.el.matchPageTitle.innerHTML = '<i class="fas fa-futbol"></i> ' + this.escapeHtml(m.opponent);
      const dateStr = m.date ? new Date(m.date + 'T00:00:00').toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
      const isLoggedIn = !!this.state.currentUser;
      const currentUid = this.state.currentUser ? this.state.currentUser.id : null;
      const isClosed = m.closed;
      const players = (m.players || []).map(p => {
        const ratings = p.ratings ? Object.values(p.ratings) : [];
        const avg = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
        const voteCount = ratings.length;
        const userVote = currentUid && p.ratings ? p.ratings[currentUid] : null;
        let starsHtml = '';
        if (isLoggedIn && !isClosed) {
          for (let s = 1; s <= 10; s++) {
            const active = userVote === s ? 'voted' : '';
            starsHtml += '<button class="match-star-btn ' + active + '" onclick="APP.votePlayer(\'' + m.id + '\',\'' + p.id + '\',' + s + ')">' + (s <= userVote ? '\u2605' : '\u2606') + '</button>';
          }
        } else if (isClosed) {
          starsHtml = '<span class="match-closed-msg">Votazione chiusa</span>';
        } else {
          starsHtml = '<span style="font-size:11px;color:var(--text-muted)">Accedi per votare</span>';
        }
        const avgClass = voteCount >= 3 ? (avg >= 7 ? 'top-avg' : avg <= 5 ? 'flop-avg' : '') : '';
        return '<div class="match-player-card">' +
          '<div class="match-player-number">' + p.number + '</div>' +
          '<div class="match-player-info">' +
          '<div class="match-player-name">' + this.escapeHtml(p.name) + '</div>' +
          '<div class="match-player-role">' + this.getRoleLabel(p.position) + '</div>' +
          '</div>' +
          '<div class="match-player-votes">' +
          '<div class="match-player-avg ' + avgClass + '">' + (voteCount > 0 ? avg.toFixed(1) : '-') + '</div>' +
          '<div class="match-player-count">' + voteCount + ' voti</div>' +
          '</div>' +
          '<div class="match-player-stars">' + starsHtml + '</div>' +
          '</div>';
      }).join('');
      container.innerHTML =
        '<div class="match-info">' +
        '<div class="match-info-item"><span class="match-info-label">Data</span><span class="match-info-value">' + dateStr + '</span></div>' +
        (m.result ? '<div class="match-info-item"><span class="match-info-label">Risultato</span><span class="match-info-value">' + this.escapeHtml(m.result) + '</span></div>' : '') +
        '<div class="match-info-item"><span class="match-info-label">Voti totali</span><span class="match-info-value">' + (m.players ? m.players.reduce((sum, p) => sum + Object.keys(p.ratings || {}).length, 0) : 0) + '</span></div>' +
        (isClosed ? '<div class="match-info-item"><span class="match-info-label">Stato</span><span class="match-info-value" style="color:var(--accent3)">Chiusa</span></div>' : '') +
        '</div>' +
        '<div class="match-player-list">' + players + '</div>';
    } catch (e) { console.error('Open match error:', e); }
  },

  async votePlayer(matchId, playerId, score) {
    if (!this.state.currentUser) { this.toast('Accedi per votare!', 'warning'); return; }
    try {
      const doc = await db.collection('matches').doc(matchId).get();
      if (!doc.exists) return;
      const m = { id: doc.id, ...doc.data() };
      if (m.closed) { this.toast('Votazione chiusa per questa partita.', 'warning'); return; }
      const player = m.players.find(x => x.id === playerId);
      if (!player) return;
      if (!player.ratings) player.ratings = {};
      const uid = this.state.currentUser.id;
      if (player.ratings[uid] === score) {
        delete player.ratings[uid];
        this.toast('Voto rimosso!', 'info');
      } else {
        player.ratings[uid] = score;
        this.toast('Voto registrato: ' + score + '/10', 'success');
      }
      await db.collection('matches').doc(matchId).update({ players: m.players });
      this.openMatch(matchId);
    } catch (e) { this.toast('Errore durante il voto.', 'error'); }
  },

  getRoleLabel(pos) {
    const labels = { P: 'Portiere', D: 'Difensore', C: 'Centrocampista', A: 'Attaccante' };
    return labels[pos] || pos || 'Giocatore';
  },

  /* ---------- ADMIN: MATCHES ---------- */
  async renderAdminMatches() {
    const matches = [];
    try {
      const snapshot = await db.collection('matches').orderBy('createdAt', 'desc').get();
      snapshot.forEach(doc => matches.push({ id: doc.id, ...doc.data() }));
    } catch (e) { console.error(e); }
    if (this.el.adminMatchCount) this.el.adminMatchCount.textContent = matches.length + ' partite';
    const container = this.el.adminMatchList;
    if (!container) return;
    if (matches.length === 0) {
      container.innerHTML = '<div class="gb-empty"><i class="fas fa-futbol"></i><p>Nessuna partita.</p></div>';
      return;
    }
    container.innerHTML = matches.map(m => {
      const dateStr = m.date || '?';
      return '<div class="admin-msg-item">' +
        '<div class="admin-msg-info">' +
        '<div class="admin-msg-text"><strong>' + this.escapeHtml(m.opponent) + '</strong> ' + (m.result ? '\u00B7 ' + this.escapeHtml(m.result) : '') + ' ' + (m.closed ? '<span style="color:var(--accent3);font-size:11px">[Chiusa]</span>' : '') + '</div>' +
        '<div class="admin-msg-meta">' + dateStr + ' \u00B7 ' + (m.players ? m.players.length : 0) + ' giocatori</div>' +
        '</div>' +
        '<div class="admin-msg-actions">' +
        '<button class="btn btn-ghost btn-sm" onclick="APP.adminToggleMatchClose(\'' + m.id + '\')" title="' + (m.closed ? 'Riapri' : 'Chiudi') + ' votazioni"><i class="fas ' + (m.closed ? 'fa-lock-open' : 'fa-lock') + '"></i></button>' +
        '<button class="btn btn-ghost btn-sm" onclick="APP.adminOpenEditMatch(\'' + m.id + '\')"><i class="fas fa-pen"></i></button>' +
        '<button class="btn btn-danger btn-sm" onclick="APP.adminDeleteMatch(\'' + m.id + '\')"><i class="fas fa-trash"></i></button>' +
        '</div></div>';
    }).join('');
  },

  adminOpenAddMatch() {
    this.state._editingMatchId = null;
    if (this.el.matchModalTitle) this.el.matchModalTitle.innerHTML = '<i class="fas fa-futbol"></i> Nuova Partita';
    if (this.el.mmOpponent) this.el.mmOpponent.value = '';
    if (this.el.mmDate) this.el.mmDate.value = new Date().toISOString().slice(0, 10);
    if (this.el.mmResult) this.el.mmResult.value = '';
    if (this.el.mmPlayers) this.el.mmPlayers.value = '';
    if (this.el.mmError) this.el.mmError.textContent = '';
    if (this.el.matchModal) this.el.matchModal.style.display = '';
  },

  adminOpenEditMatch(matchId) {
    (async () => {
      try {
        const doc = await db.collection('matches').doc(matchId).get();
        if (!doc.exists) return;
        const m = doc.data();
        this.state._editingMatchId = matchId;
        if (this.el.matchModalTitle) this.el.matchModalTitle.innerHTML = '<i class="fas fa-futbol"></i> Modifica Partita';
        if (this.el.mmOpponent) this.el.mmOpponent.value = m.opponent || '';
        if (this.el.mmDate) this.el.mmDate.value = m.date || '';
        if (this.el.mmResult) this.el.mmResult.value = m.result || '';
        if (this.el.mmPlayers) this.el.mmPlayers.value = (m.players || []).map(p => p.number + '.' + p.name + '.' + (p.position || '')).join('\n');
        if (this.el.mmError) this.el.mmError.textContent = '';
        if (this.el.matchModal) this.el.matchModal.style.display = '';
      } catch (e) { console.error(e); }
    })();
  },

  adminSaveMatch() {
    (async () => {
      const opponent = this.el.mmOpponent.value.trim();
      const date = this.el.mmDate.value;
      const result = this.el.mmResult.value.trim();
      const playersRaw = this.el.mmPlayers.value.trim();
      if (this.el.mmError) this.el.mmError.textContent = '';
      if (!opponent) { if (this.el.mmError) this.el.mmError.textContent = 'Inserisci l\'avversario.'; return; }
      if (!playersRaw) { if (this.el.mmError) this.el.mmError.textContent = 'Inserisci almeno un giocatore.'; return; }
      const players = playersRaw.split('\n').filter(line => line.trim()).map(line => {
        const parts = line.split('.');
        return {
          id: 'pl_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
          number: parts[0] ? parts[0].trim() : '?',
          name: parts[1] ? parts[1].trim() : '?',
          position: parts[2] ? parts[2].trim().toUpperCase() : 'C',
          ratings: {},
        };
      });
      try {
        if (this.state._editingMatchId) {
          const doc = await db.collection('matches').doc(this.state._editingMatchId).get();
          if (!doc.exists) return;
          const existing = doc.data();
          const oldRatings = {};
          (existing.players || []).forEach(p => { if (p.ratings) oldRatings[p.name] = p.ratings; });
          players.forEach(p => { if (oldRatings[p.name]) p.ratings = oldRatings[p.name]; });
          await db.collection('matches').doc(this.state._editingMatchId).update({ opponent, date, result, players });
        } else {
          await db.collection('matches').add({ opponent, date, result, players, createdAt: Date.now(), closed: false });
        }
        this.state._editingMatchId = null;
        this.adminCloseMatchModal();
        this.renderAdminMatches();
        this.toast('Partita salvata!', 'success');
      } catch (e) { if (this.el.mmError) this.el.mmError.textContent = 'Errore durante il salvataggio.'; }
    })();
  },

  adminCloseMatchModal() {
    this.state._editingMatchId = null;
    if (this.el.matchModal) this.el.matchModal.style.display = 'none';
  },

  async adminDeleteMatch(matchId) {
    if (!confirm('Eliminare questa partita e tutti i voti?')) return;
    try {
      await db.collection('matches').doc(matchId).delete();
      this.renderAdminMatches();
      this.toast('Partita eliminata.', 'info');
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  async adminToggleMatchClose(matchId) {
    try {
      const doc = await db.collection('matches').doc(matchId).get();
      if (!doc.exists) return;
      const closed = !doc.data().closed;
      await db.collection('matches').doc(matchId).update({ closed });
      this.renderAdminMatches();
      this.toast(closed ? 'Votazione chiusa.' : 'Votazione riaperta.', 'info');
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  /* ---------- ADMIN: USERS ---------- */
  async renderAdminUsers() {
    const users = [];
    try {
      const snapshot = await db.collection('users').orderBy('username').get();
      snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
    } catch (e) { console.error(e); }
    if (this.el.adminUserCount) this.el.adminUserCount.textContent = users.length + ' utenti';
    const container = this.el.adminUserList;
    if (!container) return;
    if (users.length === 0) {
      container.innerHTML = '<div class="gb-empty"><i class="fas fa-users"></i><p>Nessun utente.</p></div>';
      return;
    }
    const roleMap = { admin: 'Admin', editor: 'Editor', user: 'Tifoso' };
    container.innerHTML = users.map(u => {
      const banBtn = u.role !== 'admin' ? '<button class="btn btn-sm ' + (u.banned ? 'btn-ghost' : 'btn-danger') + '" onclick="APP.adminToggleBanUser(\'' + u.id + '\')" title="' + (u.banned ? 'Riattiva' : 'Sospendi') + '"><i class="fas ' + (u.banned ? 'fa-check' : 'fa-ban') + '"></i></button>' : '';
      return '<div class="admin-msg-item' + (u.banned ? ' admin-msg-banned' : '') + '">' +
        '<div class="admin-msg-info">' +
        '<div class="admin-msg-text"><strong>' + this.escapeHtml(u.username) + '</strong> \u00B7 ' + (roleMap[u.role] || u.role) + (u.banned ? ' <span style="color:var(--accent3);font-size:11px">[Sospeso]</span>' : '') + ' \u00B7 ' + this.escapeHtml(u.email) + '</div>' +
        '<div class="admin-msg-meta">Iscritto dal ' + (u.createdAt ? new Date(u.createdAt).toLocaleDateString('it-IT') : '?') + '</div>' +
        '</div>' +
        '<div class="admin-msg-actions">' +
        banBtn +
        '<button class="btn btn-ghost btn-sm" onclick="APP.adminOpenEditUser(\'' + u.id + '\')" title="Modifica"><i class="fas fa-pen"></i></button>' +
        '<button class="btn btn-ghost btn-sm" onclick="APP.adminCopyResetLink(\'' + u.id + '\')" title="Copia link reset"><i class="fas fa-key"></i></button>' +
        (u.role !== 'admin' ? '<button class="btn btn-danger btn-sm" onclick="APP.adminDeleteUser(\'' + u.id + '\')"><i class="fas fa-trash"></i></button>' : '') +
        '</div></div>';
    }).join('');
  },

  adminOpenCreateUser() {
    this.state._editingUserId = null;
    if (this.el.userModalTitle) this.el.userModalTitle.innerHTML = '<i class="fas fa-user"></i> Nuovo Utente';
    if (this.el.umUsername) this.el.umUsername.value = '';
    if (this.el.umEmail) this.el.umEmail.value = '';
    if (this.el.umPassword) this.el.umPassword.value = '';
    if (this.el.umRole) this.el.umRole.value = 'user';
    if (this.el.umError) this.el.umError.textContent = '';
    if (this.el.userModal) this.el.userModal.style.display = '';
  },

  adminOpenEditUser(userId) {
    (async () => {
      try {
        const doc = await db.collection('users').doc(userId).get();
        if (!doc.exists) return;
        const u = doc.data();
        this.state._editingUserId = userId;
        if (this.el.userModalTitle) this.el.userModalTitle.innerHTML = '<i class="fas fa-user"></i> Modifica Utente';
        if (this.el.umUsername) this.el.umUsername.value = u.username || '';
        if (this.el.umEmail) this.el.umEmail.value = u.email || '';
        if (this.el.umPassword) this.el.umPassword.value = '';
        if (this.el.umRole) this.el.umRole.value = u.role || 'user';
        if (this.el.umError) this.el.umError.textContent = '';
        if (this.el.userModal) this.el.userModal.style.display = '';
      } catch (e) { console.error(e); }
    })();
  },

  adminSaveUser() {
    (async () => {
      const username = this.el.umUsername.value.trim();
      const email = this.el.umEmail.value.trim();
      const password = this.el.umPassword.value.trim();
      const role = this.el.umRole.value;
      if (this.el.umError) this.el.umError.textContent = '';
      if (!username || !email) { if (this.el.umError) this.el.umError.textContent = 'Username ed email obbligatori.'; return; }
      try {
        if (this.state._editingUserId) {
          const updates = { username, email, role };
          if (password) {
            await auth.sendPasswordResetEmail(email);
            this.toast('Email di reset password inviata a ' + email, 'info');
          }
          await db.collection('users').doc(this.state._editingUserId).update(updates);
        } else {
          if (!password) { if (this.el.umError) this.el.umError.textContent = 'Password obbligatoria per nuovi utenti.'; return; }
          const cred = await auth.createUserWithEmailAndPassword(email, password);
          await db.collection('users').doc(cred.user.uid).set({ username, email, role, avatar: '', createdAt: Date.now() });
        }
        this.state._editingUserId = null;
        this.adminCloseUserModal();
        this.renderAdminUsers();
        this.toast('Utente salvato!', 'success');
      } catch (e) {
        if (this.el.umError) this.el.umError.textContent = e.code === 'auth/email-already-in-use' ? 'Email gi\u00e0 in uso.' : 'Errore durante il salvataggio.';
      }
    })();
  },

  adminCloseUserModal() {
    this.state._editingUserId = null;
    if (this.el.userModal) this.el.userModal.style.display = 'none';
  },

  async adminDeleteUser(userId) {
    if (!confirm('Eliminare questo utente?')) return;
    try {
      await db.collection('users').doc(userId).delete();
      this.renderAdminUsers();
      this.toast('Utente eliminato.', 'info');
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  async adminCopyResetLink(userId) {
    try {
      const doc = await db.collection('users').doc(userId).get();
      if (!doc.exists) return;
      const email = doc.data().email;
      if (!email) { this.toast('Email non trovata.', 'error'); return; }
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + firebaseConfig.apiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestType: 'PASSWORD_RESET', email })
      });
      const data = await res.json();
      if (data.oobCode) {
        const link = 'https://' + firebaseConfig.projectId + '.firebaseapp.com/__/auth/action?mode=resetPassword&oobCode=' + data.oobCode + '&apiKey=' + firebaseConfig.apiKey + '&lang=it';
        try { await navigator.clipboard.writeText(link); this.toast('Link reset copiato negli appunti!', 'success'); } catch (e) { this.toast('Link: ' + link, 'info'); }
      } else {
        await auth.sendPasswordResetEmail(email);
        this.toast('Email di reset inviata a ' + email, 'info');
      }
    } catch (e) { this.toast('Errore. Email inviata manualmente.', 'info'); try { await auth.sendPasswordResetEmail(email); } catch (e2) {} }
  },

  async adminToggleBanUser(userId) {
    try {
      const doc = await db.collection('users').doc(userId).get();
      if (!doc.exists) return;
      const banned = !doc.data().banned;
      await db.collection('users').doc(userId).update({ banned });
      this.renderAdminUsers();
      this.toast(banned ? 'Utente sospeso.' : 'Utente riattivato.', 'info');
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  /* ---------- ADMIN: MESSAGES ---------- */
  async renderAdminMessages() {
    const messages = [];
    try {
      const snapshot = await db.collection('messages').orderBy('createdAt', 'desc').limit(100).get();
      snapshot.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
    } catch (e) { console.error(e); }
    if (this.el.adminMsgCount) this.el.adminMsgCount.textContent = messages.length + ' messaggi';
    const container = this.el.adminMsgList;
    if (!container) return;
    if (messages.length === 0) {
      container.innerHTML = '<div class="gb-empty"><i class="fas fa-comment"></i><p>Nessun messaggio.</p></div>';
      return;
    }
    container.innerHTML = messages.map(m => {
      const time = m.createdAt ? new Date(m.createdAt).toLocaleString('it-IT') : '';
      return '<div class="admin-msg-item">' +
        '<div class="admin-msg-info">' +
        '<div class="admin-msg-author">' + this.escapeHtml(m.authorName || 'Anonimo') + '</div>' +
        '<div class="admin-msg-text">' + this.escapeHtml(m.text) + '</div>' +
        '<div class="admin-msg-meta">' + time + ' \u00B7 Like: ' + (m.likes || 0) + ' \u00B7 Dislike: ' + (m.dislikes || 0) + '</div>' +
        '</div>' +
        '<div class="admin-msg-actions">' +
        '<button class="btn btn-danger btn-sm" onclick="APP.adminDeleteMessage(\'' + m.id + '\')"><i class="fas fa-trash"></i></button>' +
        '</div></div>';
    }).join('');
  },

  adminClearFiltered() {
    (async () => {
      if (!confirm('Eliminare tutti i messaggi?')) return;
      try {
        const snapshot = await db.collection('messages').get();
        const batch = db.batch();
        snapshot.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        this.renderAdminMessages();
        this.toast('Messaggi eliminati.', 'info');
      } catch (e) { this.toast('Errore.', 'error'); }
    })();
  },

  async adminDeleteMessage(messageId) {
    if (!confirm('Eliminare questo messaggio?')) return;
    try {
      await db.collection('messages').doc(messageId).delete();
      this.renderAdminMessages();
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  /* ---------- ADMIN: RADIO ---------- */
  async renderAdminRadio() {
    try {
      const doc = await db.collection('radio').doc('config').get();
      const r = doc.exists ? doc.data() : {};
      if (this.el.adminMixlrUser) this.el.adminMixlrUser.value = r.mixlrUsername || '';
      if (this.el.adminStreamUrl) this.el.adminStreamUrl.value = r.streamUrl || '';
      if (this.el.adminStreamName) this.el.adminStreamName.value = r.streamName || 'Radio aleLatina';
      this.renderAdminPodcasts(r.podcasts || []);
      this.renderAdminSchedule(r.schedule || []);
    } catch (e) { console.error(e); }
  },

  adminAddScheduleItem() {
    (async () => {
      const day = this.el.adminSchedDay.value.trim();
      const hour = this.el.adminSchedHour.value.trim();
      const title = this.el.adminSchedTitle.value.trim();
      const description = this.el.adminSchedDesc.value.trim();
      const tag = this.el.adminSchedTag.value.trim();
      if (!day || !hour || !title) { this.toast('Giorno, ora e titolo obbligatori.', 'warning'); return; }
      try {
        const doc = await db.collection('radio').doc('config').get();
        const data = doc.exists ? doc.data() : { schedule: [] };
        const schedule = data.schedule || [];
        schedule.push({ day, hour, title, description, tag, createdAt: Date.now() });
        data.schedule = schedule;
        await db.collection('radio').doc('config').set(data, { merge: true });
        this.el.adminSchedDay.value = '';
        this.el.adminSchedHour.value = '';
        this.el.adminSchedTitle.value = '';
        this.el.adminSchedDesc.value = '';
        this.el.adminSchedTag.value = '';
        this.renderAdminSchedule(schedule);
        this.toast('Appuntamento aggiunto!', 'success');
      } catch (e) { this.toast('Errore.', 'error'); }
    })();
  },

  renderAdminSchedule(schedule) {
    const container = document.getElementById('adminScheduleList');
    if (!container) return;
    if (!schedule || schedule.length === 0) {
      container.innerHTML = '<div class="gb-empty" style="padding:12px"><i class="fas fa-calendar-days"></i><p>Nessun appuntamento.</p></div>';
      return;
    }
    container.innerHTML = schedule.map((s, i) => {
      return '<div class="admin-msg-item">' +
        '<div class="admin-msg-info">' +
        '<strong>' + this.escapeHtml(s.day + ' - ' + s.hour) + '</strong>: ' + this.escapeHtml(s.title || '') +
        (s.description ? '<div class="admin-msg-meta">' + this.escapeHtml(s.description) + '</div>' : '') +
        (s.tag ? '<span class="member-role member-role-editor" style="display:inline-block;margin-top:4px">' + this.escapeHtml(s.tag) + '</span>' : '') +
        '</div>' +
        '<div class="admin-msg-actions">' +
        '<button class="btn btn-danger btn-sm" onclick="APP.adminDeleteScheduleItem(' + i + ')"><i class="fas fa-trash"></i></button>' +
        '</div></div>';
    }).join('');
  },

  async adminDeleteScheduleItem(index) {
    if (!confirm('Rimuovere questo appuntamento?')) return;
    try {
      const doc = await db.collection('radio').doc('config').get();
      if (!doc.exists) return;
      const data = doc.data();
      const schedule = data.schedule || [];
      schedule.splice(index, 1);
      data.schedule = schedule;
      await db.collection('radio').doc('config').set(data, { merge: true });
      this.renderAdminSchedule(schedule);
      this.toast('Appuntamento rimosso.', 'info');
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  async adminSaveRadioConfig() {
    const mixlrUsername = this.el.adminMixlrUser.value.trim();
    const streamUrl = this.el.adminStreamUrl.value.trim();
    const streamName = this.el.adminStreamName.value.trim() || 'Radio aleLatina';
    try {
      const doc = await db.collection('radio').doc('config').get();
      const data = doc.exists ? doc.data() : {};
      data.mixlrUsername = mixlrUsername;
      data.streamUrl = streamUrl;
      data.streamName = streamName;
      await db.collection('radio').doc('config').set(data, { merge: true });
      this.toast('Configurazione radio salvata!', 'success');
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  renderAdminPodcasts(podcasts) {
    const container = this.el.adminPodcastList;
    if (!container) return;
    if (!podcasts || podcasts.length === 0) {
      container.innerHTML = '<div class="gb-empty"><i class="fas fa-podcast"></i><p>Nessuna puntata.</p></div>';
      return;
    }
    container.innerHTML = podcasts.map((p, i) => {
      return '<div class="admin-msg-item">' +
        '<div class="admin-msg-info">' +
        '<div class="admin-msg-text"><strong>' + this.escapeHtml(p.title || '') + '</strong></div>' +
        (p.description ? '<div class="admin-msg-meta">' + this.escapeHtml(p.description) + '</div>' : '') +
        '</div>' +
        '<div class="admin-msg-actions">' +
        '<button class="btn btn-ghost btn-sm" onclick="APP.adminOpenEditPodcast(' + i + ')"><i class="fas fa-pen"></i></button>' +
        '<button class="btn btn-danger btn-sm" onclick="APP.adminDeletePodcast(' + i + ')"><i class="fas fa-trash"></i></button>' +
        '</div></div>';
    }).join('');
  },

  adminOpenAddPodcast() {
    this.state._editingPodcastId = null;
    if (this.el.podcastModalTitle) this.el.podcastModalTitle.innerHTML = '<i class="fas fa-podcast"></i> Nuova Puntata';
    if (this.el.pmTitle) this.el.pmTitle.value = '';
    if (this.el.pmDescription) this.el.pmDescription.value = '';
    if (this.el.pmAudioUrl) this.el.pmAudioUrl.value = '';
    if (this.el.pmImageUrl) this.el.pmImageUrl.value = '';
    if (this.el.pmPodcastError) this.el.pmPodcastError.textContent = '';
    if (this.el.podcastModal) this.el.podcastModal.style.display = '';
  },

  adminOpenEditPodcast(index) {
    (async () => {
      try {
        const doc = await db.collection('radio').doc('config').get();
        if (!doc.exists) return;
        const data = doc.data();
        const podcasts = data.podcasts || [];
        const p = podcasts[index];
        if (!p) return;
        this.state._editingPodcastId = index;
        if (this.el.podcastModalTitle) this.el.podcastModalTitle.innerHTML = '<i class="fas fa-podcast"></i> Modifica Puntata';
        if (this.el.pmTitle) this.el.pmTitle.value = p.title || '';
        if (this.el.pmDescription) this.el.pmDescription.value = p.description || '';
        if (this.el.pmAudioUrl) this.el.pmAudioUrl.value = p.audioUrl || '';
        if (this.el.pmImageUrl) this.el.pmImageUrl.value = p.imageUrl || '';
        if (this.el.pmPodcastError) this.el.pmPodcastError.textContent = '';
        if (this.el.podcastModal) this.el.podcastModal.style.display = '';
      } catch (e) { console.error(e); }
    })();
  },

  adminSavePodcast() {
    (async () => {
      const title = this.el.pmTitle.value.trim();
      const description = this.el.pmDescription.value.trim();
      const audioUrl = this.el.pmAudioUrl.value.trim();
      const imageUrl = this.el.pmImageUrl.value.trim();
      if (this.el.pmPodcastError) this.el.pmPodcastError.textContent = '';
      if (!title || !audioUrl) { if (this.el.pmPodcastError) this.el.pmPodcastError.textContent = 'Titolo e URL audio obbligatori.'; return; }
      try {
        const doc = await db.collection('radio').doc('config').get();
        const data = doc.exists ? doc.data() : { podcasts: [] };
        const podcasts = data.podcasts || [];
        const entry = { title, description, audioUrl, imageUrl, createdAt: Date.now() };
        if (this.state._editingPodcastId !== null && this.state._editingPodcastId !== undefined) {
          podcasts[this.state._editingPodcastId] = entry;
        } else {
          podcasts.push(entry);
        }
        data.podcasts = podcasts;
        await db.collection('radio').doc('config').set(data, { merge: true });
        this.state._editingPodcastId = null;
        this.adminClosePodcastModal();
        this.renderAdminRadio();
        this.toast('Puntata salvata!', 'success');
      } catch (e) { if (this.el.pmPodcastError) this.el.pmPodcastError.textContent = 'Errore.'; }
    })();
  },

  adminClosePodcastModal() {
    this.state._editingPodcastId = null;
    if (this.el.podcastModal) this.el.podcastModal.style.display = 'none';
  },

  adminDeletePodcast(index) {
    (async () => {
      if (!confirm('Eliminare questa puntata?')) return;
      try {
        const doc = await db.collection('radio').doc('config').get();
        if (!doc.exists) return;
        const data = doc.data();
        const podcasts = data.podcasts || [];
        podcasts.splice(index, 1);
        data.podcasts = podcasts;
        await db.collection('radio').doc('config').set(data, { merge: true });
        this.renderAdminRadio();
        this.toast('Puntata eliminata.', 'info');
      } catch (e) { this.toast('Errore.', 'error'); }
    })();
  },

  /* ---------- PROFILE ---------- */
  renderProfile() {
    const u = this.state.currentUser;
    if (!u) return;
    if (this.el.profileUsername) this.el.profileUsername.textContent = u.username;
    if (this.el.profileEmail) this.el.profileEmail.textContent = u.email;
    const roleMap = { admin: 'Amministratore', editor: 'Editor', user: 'Tifoso' };
    if (this.el.profileRole) this.el.profileRole.textContent = roleMap[u.role] || 'Tifoso';
    if (this.el.profileJoined) this.el.profileJoined.textContent = u.createdAt ? new Date(u.createdAt).toLocaleDateString('it-IT') : '-';
    if (this.el.profileAvatar) {
      if (u.avatar) {
        this.el.profileAvatar.innerHTML = '<img src="' + u.avatar + '" alt="">';
      } else {
        this.el.profileAvatar.textContent = u.username.charAt(0).toUpperCase();
      }
    }
  },

  handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 500 * 1024) { this.toast('Immagine troppo grande (max 500KB).', 'warning'); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      this._newAvatar = ev.target.result;
      if (this.el.profileAvatar) this.el.profileAvatar.innerHTML = '<img src="' + this._newAvatar + '" alt="">';
    };
    reader.readAsDataURL(file);
  },

  async saveProfile() {
    const u = this.state.currentUser;
    if (!u) return;
    if (this._newAvatar) {
      try {
        await db.collection('users').doc(u.id).update({ avatar: this._newAvatar });
        this.state.avatarCache[u.id] = this._newAvatar;
        delete this.state._fetchedAuthors[u.id];
        u.avatar = this._newAvatar;
        this._newAvatar = null;
        this.afterLogin();
        this.renderMessages();
        this.toast('Foto profilo aggiornata!', 'success');
      } catch (e) { console.error('Save avatar error:', e); this.toast('Errore: ' + e.message, 'error'); }
    } else {
      this.toast('Nessuna modifica.', 'info');
    }
  },

  async removeAvatar() {
    const u = this.state.currentUser;
    if (!u) return;
    try {
      await db.collection('users').doc(u.id).update({ avatar: '' });
      u.avatar = '';
      this._newAvatar = null;
      if (this.el.profileAvatar) this.el.profileAvatar.textContent = u.username.charAt(0).toUpperCase();
      this.afterLogin();
      this.toast('Foto rimossa.', 'info');
    } catch (e) { this.toast('Errore.', 'error'); }
  },

  /* ---------- PRIVATE MESSAGES ---------- */
  async renderInbox() {
    if (this.state.currentUser) {
      this.startChatsListener();
    }
  },

  startChatsListener() {
    this.stopChatsListener();
    const uid = this.state.currentUser.id;
    this.state.chatsUnsub = db.collection('chats').where('participants', 'array-contains', uid).onSnapshot(snapshot => {
      const chats = [];
      snapshot.forEach(doc => chats.push({ id: doc.id, ...doc.data() }));
      chats.sort((a, b) => (b.lastMessageAt || 0) - (a.lastMessageAt || 0));
      this.renderConversations(chats);
      this.updateMsgBadge(chats);
    }, err => {
      console.error('Chats listener error:', err);
      const container = this.el.pmConversations;
      if (container) container.innerHTML = '<div class="gb-empty"><i class="fas fa-exclamation-triangle"></i><p>Errore nel caricamento: ' + this.escapeHtml(err.message) + '</p></div>';
    });
  },

  stopChatsListener() {
    if (this.state.chatsUnsub) { this.state.chatsUnsub(); this.state.chatsUnsub = null; }
  },

  renderConversations(chats) {
    const container = this.el.pmConversations;
    if (!container) return;
    const uid = this.state.currentUser.id;
    if (!chats || chats.length === 0) {
      container.innerHTML = '<div class="gb-empty"><i class="fas fa-envelope"></i><p>Nessuna conversazione. Cerca un tifoso dalla sezione Membri per iniziare.</p></div>';
      return;
    }
    container.innerHTML = chats.map(chat => {
      const otherId = chat.participants.find(p => p !== uid);
      const otherName = chat.participantNames ? chat.participantNames[otherId] || otherId : otherId;
      const lastMsg = chat.lastMessage || '';
      const time = chat.lastMessageAt ? new Date(chat.lastMessageAt).toLocaleString('it-IT') : '';
      const unread = chat.lastSenderId !== uid && chat.lastSenderId ? 'style="font-weight:700"' : '';
      return '<div class="pm-conv-item" onclick="APP.openConversation(\'' + otherId + '\')" ' + unread + '>' +
        '<div class="pm-conv-avatar">' + (otherName ? otherName.charAt(0).toUpperCase() : '?') + '</div>' +
        '<div class="pm-conv-info">' +
        '<div class="pm-conv-name">' + this.escapeHtml(otherName) + '</div>' +
        '<div class="pm-conv-preview">' + this.escapeHtml(lastMsg) + '</div>' +
        '<div class="pm-conv-time">' + time + '</div>' +
        '</div>' +
        '<button class="btn btn-ghost btn-sm pm-conv-del" onclick="event.stopPropagation();APP.deleteChat(\'' + otherId + '\')" title="Elimina conversazione"><i class="fas fa-trash"></i></button>' +
        '</div>';
    }).join('');
  },

  updateMsgBadge(chats) {
    const badge = this.el.sidebarMsgBadge;
    if (!badge) return;
    const uid = this.state.currentUser ? this.state.currentUser.id : null;
    if (!uid || !chats) { badge.style.display = 'none'; return; }
    const unread = chats.filter(c => c.lastSenderId && c.lastSenderId !== uid).length;
    if (unread > 0) {
      badge.textContent = unread;
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }
  },

  async deleteChat(partnerId) {
    if (!this.state.currentUser) return;
    if (!confirm('Eliminare questa conversazione? I messaggi verranno rimossi permanentemente.')) return;
    const uid = this.state.currentUser.id;
    const chatId = [uid, partnerId].sort().join('_');
    try {
      const msgsSnapshot = await db.collection('chats').doc(chatId).collection('messages').get();
      const batch = db.batch();
      msgsSnapshot.forEach(doc => batch.delete(doc.ref));
      batch.delete(db.collection('chats').doc(chatId));
      await batch.commit();
      this.toast('Conversazione eliminata.', 'info');
    } catch (e) {
      console.error('Delete chat error:', e);
      this.toast('Errore durante l\'eliminazione.', 'error');
    }
  },

  stopMessagesListener() {
    if (this.state._messagesConvUnsub) { this.state._messagesConvUnsub(); this.state._messagesConvUnsub = null; }
  },

  async openConversation(partnerId) {
    this.stopMessagesListener();
    this.state._editingChatPartnerId = partnerId;
    if (this.el.pmInbox) this.el.pmInbox.style.display = 'none';
    if (this.el.pmConversation) this.el.pmConversation.style.display = '';
    try {
      const userDoc = await db.collection('users').doc(partnerId).get();
      const partnerName = userDoc.exists ? (userDoc.data().username || partnerId) : partnerId;
      if (this.el.pmConvHeader) this.el.pmConvHeader.innerHTML = '<strong>' + this.escapeHtml(partnerName) + '</strong>';
      const uid = this.state.currentUser.id;
      const chatId = [uid, partnerId].sort().join('_');
      const container = this.el.pmConvMessages;
      if (!container) return;
      this.state._messagesConvUnsub = db.collection('chats').doc(chatId).collection('messages').orderBy('createdAt').onSnapshot(snapshot => {
        const messages = [];
        snapshot.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
        if (messages.length === 0) {
          container.innerHTML = '<div class="gb-empty"><i class="fas fa-comment"></i><p>Nessun messaggio in questa conversazione.</p></div>';
        } else {
          container.innerHTML = messages.map(m => {
            const isMe = m.senderId === uid;
            return '<div class="pm-msg ' + (isMe ? 'pm-msg-me' : 'pm-msg-other') + '">' +
              '<div class="pm-msg-text">' + this.escapeHtml(m.text) + '</div>' +
              '<div class="pm-msg-time">' + (m.createdAt ? new Date(m.createdAt).toLocaleString('it-IT') : '') + '</div>' +
              '</div>';
          }).join('');
        }
        container.scrollTop = container.scrollHeight;
      }, err => {
        console.error('Messages listener error:', err);
        container.innerHTML = '<div class="gb-empty"><i class="fas fa-exclamation-triangle"></i><p>Errore caricamento messaggi.</p></div>';
      });
    } catch (e) { console.error('Open conversation error:', e); }
  },

  showInbox() {
    this.stopMessagesListener();
    this.state._editingChatPartnerId = null;
    if (this.el.pmInbox) this.el.pmInbox.style.display = '';
    if (this.el.pmConversation) this.el.pmConversation.style.display = 'none';
    this.renderInbox();
  },

  async sendPrivateMessage() {
    if (!this.state.currentUser) return;
    const input = this.el.pmMessageInput;
    if (!input) return;
    const text = input.value.trim();
    if (!text) { this.toast('Scrivi un messaggio!', 'warning'); return; }
    const filtered = this.filterBadWords(text);
    const partnerId = this.state._editingChatPartnerId;
    if (!partnerId) return;
    const uid = this.state.currentUser.id;
    const chatId = [uid, partnerId].sort().join('_');
    try {
      const partnerDoc = await db.collection('users').doc(partnerId).get();
      const partnerName = partnerDoc.exists ? (partnerDoc.data().username || partnerId) : partnerId;
      await db.collection('chats').doc(chatId).collection('messages').add({
        senderId: uid,
        text: filtered,
        createdAt: Date.now(),
      });
      const participantNames = {};
      participantNames[uid] = this.state.currentUser.username;
      participantNames[partnerId] = partnerName;
      await db.collection('chats').doc(chatId).set({
        participants: [uid, partnerId],
        participantNames,
        lastMessage: filtered,
        lastMessageAt: Date.now(),
        lastSenderId: uid,
      }, { merge: true });
      input.value = '';
      const container = this.el.pmConvMessages;
      if (container) container.scrollTop = container.scrollHeight;
    } catch (e) {
      if (this.el.pmError) this.el.pmError.textContent = 'Errore durante l\'invio.';
    }
  },

  async startPrivateChat(userId) {
    if (!this.state.currentUser) { this.toast('Accedi per mandare messaggi.', 'warning'); return; }
    if (userId === this.state.currentUser.id) { this.toast('Non puoi scrivere a te stesso.', 'info'); return; }
    this.navigateTo('messages');
    this.openConversation(userId);
  },
};

document.addEventListener('DOMContentLoaded', () => APP.init());
