import Firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAdOolcixYGHrcPp2t7jSsU-H2myxp02RQ",
    authDomain: "managerap-bcb7f.firebaseapp.com",
    databaseURL: "https://managerap-bcb7f.firebaseio.com",
    projectId: "managerap-bcb7f",
    storageBucket: "managerap-bcb7f.appspot.com",
    messagingSenderId: "338430429826",
    appId: "1:338430429826:web:874d42c94811efe0"
  };

  export const Fire = Firebase.initializeApp(firebaseConfig)