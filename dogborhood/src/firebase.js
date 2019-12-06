import firebase from 'firebase/app'
import 'firebase/storage'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAea5mcndVdMwzSoliwbBXEXkVww0Gm7hI",
    authDomain: "dogborhood.firebaseapp.com",
    databaseURL: "https://dogborhood.firebaseio.com",
    projectId: "dogborhood",
    storageBucket: "dogborhood.appspot.com",
    messagingSenderId: "1009761897821",
    appId: "1:1009761897821:web:a2661f6f966f6a1081acb4",
    measurementId: "G-E4601QW0HB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase;