const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendMentionNotification = functions.firestore
  .document('notifications/{notifId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (!data || data.type !== 'mention') return;
    const { userId, fromName, text } = data;
    if (!userId || !fromName) return;
    try {
      const userDoc = await admin.firestore().collection('users').doc(userId).get();
      if (!userDoc.exists) return;
      const tokens = userDoc.data().fcmTokens || [];
      if (tokens.length === 0) return;
      const payload = {
        notification: {
          title: `Menzione da ${fromName}`,
          body: text || 'Ti ha menzionato nel muro',
          icon: '/supporter/images/icon-192.png',
        },
        data: { url: '/supporter/?page=guestbook' },
      };
      await admin.messaging().sendEachForMulticast({ tokens, ...payload });
    } catch (e) { console.error('Mention push error:', e); }
  });

exports.sendPrivateMessageNotification = functions.firestore
  .document('chats/{chatId}/messages/{msgId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (!data) return;
    const { chatId } = context.params;
    const { authorId, authorName, text } = data;
    if (!authorId || !authorName || !chatId) return;
    try {
      const chatDoc = await admin.firestore().collection('chats').doc(chatId).get();
      if (!chatDoc.exists) return;
      const participants = chatDoc.data().participants || [];
      const recipientId = participants.find(p => p !== authorId);
      if (!recipientId) return;
      const userDoc = await admin.firestore().collection('users').doc(recipientId).get();
      if (!userDoc.exists) return;
      const tokens = userDoc.data().fcmTokens || [];
      if (tokens.length === 0) return;
      const preview = text ? (text.length > 100 ? text.slice(0, 100) + '...' : text) : 'Nuovo messaggio';
      const payload = {
        notification: {
          title: `Messaggio da ${authorName}`,
          body: preview,
          icon: '/supporter/images/icon-192.png',
        },
        data: { url: '/supporter/?page=messages' },
      };
      await admin.messaging().sendEachForMulticast({ tokens, ...payload });
    } catch (e) { console.error('PM push error:', e); }
  });
