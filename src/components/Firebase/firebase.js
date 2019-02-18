
import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';


const config = {
    apiKey: "AIzaSyA7fsBUxZCYB_CNE_9H8aSgTGxsQi_J8VY",
    authDomain: "fir-project-8442c.firebaseapp.com",
    databaseURL: "https://fir-project-8442c.firebaseio.com",
    projectId: "fir-project-8442c",
    storageBucket: "fir-project-8442c.appspot.com",
    messagingSenderId: "609879751698",

  };
  class Firebase {
    constructor() {
      app.initializeApp(config);

      this.serverValue = app.database.ServerValue
      this.emailAuthProvider = app.auth.EmailAuthProvider;
      this.auth = app.auth();
      this.db = app.database();

      this.googleProvider = new app.auth.GoogleAuthProvider()
      this.facebookProvider = new app.auth.FacebookAuthProvider();

    }
  
    // *** Auth API ***

    doSendEmailVerification = () =>
      this.auth.currentUser.sendEmailVerification({
        url: 'http://localhost:3000'
      })

    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);
  
    doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

      doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider)

        doSignInWithFacebook = () =>
          this.auth.signInWithPopup(this.facebookProvider);
  
    doSignOut = () => this.auth.signOut();
  
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

      // *** Merge AUTH and DB user API *** //

      onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
          if (authUser) {
            this.user(authUser.uid)
            .once('value')
            .then(snapshot => {
              const dbUser = snapshot.val()
              console.log(dbUser)

              // default empty roles
              if (!dbUser.roles) {
                dbUser.roles = [];
                }

              // merge auth and db user
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                ...dbUser,
              }
              next(authUser)
            })
          } else {
            fallback()
          }
        })

       // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

   /// *** MESSAGE API *** ///

   message = uid => this.db.ref(`message/${uid}`)

   messages = () => this.db.ref('messages')

   /// *** Event Starter API *** ///

    event = uid => this.db.ref(`event/${uid}`)

    events = () => this.db.ref('events')
  }

  export default Firebase;