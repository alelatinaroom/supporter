const firebaseConfig = {
  apiKey: "AIzaSyBuD88K2qylq69vFnSbOlcOm0WSQTLG0TA",
  authDomain: "alelatina-3aed9.firebaseapp.com",
  projectId: "alelatina-3aed9",
  storageBucket: "alelatina-3aed9.firebasestorage.app",
  messagingSenderId: "609389381567",
  appId: "1:609389381567:web:661c37fcb5585d0325c30a",
  measurementId: "G-P8BBF9Q02N"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;
