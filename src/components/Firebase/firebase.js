import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDlp_TNNMiNHNsWnPyExu1zPsAca2sM6vw",
    authDomain: "fir-auth-ae4f4.firebaseapp.com",
    databaseURL: "https://fir-auth-ae4f4.firebaseio.com",
    projectId: "fir-auth-ae4f4",
    storageBucket: "fir-auth-ae4f4.appspot.com",
    messagingSenderId: "111479692025"
};

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   };

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.auth = app.auth();
    this.db = app.database();

    this.googleProvider = new app.auth.GoogleAuthProvider();

    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });


  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
        .once('value')
        .then(snapshot => {
          const dbUser = snapshot.val();

          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = [];
          }

          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            ...dbUser,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
          };

          next(authUser);
        });
      } else {
        fallback();
        }
    });  

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref(`messages`);

  // *** Event API ***

  event = uid => this.db.ref(`events/${uid}`);

  events = () => this.db.ref(`events`);
}

export default Firebase;
