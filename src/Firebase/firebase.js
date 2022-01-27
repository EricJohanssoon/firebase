import firebase from 'firebase';

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCg0MyUNDHCPcyRrryYz7eHuffVwowxCuA",
    authDomain: "my-first-project-f73e4.firebaseapp.com",
    projectId: "my-first-project-f73e4",
    storageBucket: "my-first-project-f73e4.appspot.com",
    messagingSenderId: "665226209421",
    appId: "1:665226209421:web:a8c3285aad900641745ac4",
    measurementId: "G-NF5DCG7FGG"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export {firebase}