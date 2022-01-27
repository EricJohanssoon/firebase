import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {signOut} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, doc, setDoc, getDoc  } from 'firebase/firestore';
import { useDebugValue } from 'react';


const firebaseConfig = {
    apiKey: "AIzaSyCg0MyUNDHCPcyRrryYz7eHuffVwowxCuA",
    authDomain: "my-first-project-f73e4.firebaseapp.com",
    projectId: "my-first-project-f73e4",
    storageBucket: "my-first-project-f73e4.appspot.com",
    messagingSenderId: "665226209421",
    appId: "1:665226209421:web:a8c3285aad900641745ac4",
    measurementId: "G-NF5DCG7FGG"
};

const logOut = () => {
    signOut(auth);
  };

function refreshPage() {
  window.location.reload(false);
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const db2 = getFirestore(app);
const auth = getAuth(app);

function writeUserData(user) {
    set(ref(db, 'users/' + user.uid), {
    uid : user.uid,
    username: user.displayName,
    email: user.email,
  });
}


class User {
  constructor (uid, username, email, wishlist ) {
      this.uid = uid;
      this.username = username;
      this.email = email;
      this.wishlist = wishlist;

      
  }
  toString() {
      return this.uid + ', ' + this.username + ', ' + this.email + ',' + this.wishlist;
  }
}

// Firestore data converter
const userConverter = {
  toFirestore: (user) => {
      return {
          uid: user.uid,
          username: user.username,
          email: user.email,
          wishlist: user.wishlist
          };
  },
  fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      if (data == undefined){
        return undefined
      }
      return new User(data.uid, data.username, data.email, data.wishlist);
  }
};

async function addToWishList(user,movieId) {
    
    try{
      const docRef = doc(db2, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const row = userConverter.fromFirestore(docSnap);
      var myIndex = row.wishlist.indexOf(movieId-1);
      if (myIndex == -1) {
        row.wishlist.push(movieId-1);
      }      
      const ref = doc(db2, "users", row.uid).withConverter(userConverter);
      await setDoc(ref, row, {merge: true});
    }
    catch (err){
      console.error(err);
      alert("Can't add movie to wishlist");
    }

  }

  async function deleteFromWishList(user,movieId) {
    
    try{
      const docRef = doc(db2, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const row = userConverter.fromFirestore(docSnap);
      var myIndex = row.wishlist.indexOf(movieId-1);
      if (myIndex !== -1) {
        row.wishlist.splice(myIndex, 1);
      }
      const ref = doc(db2, "users", row.uid).withConverter(userConverter);
      await setDoc(ref, row, {merge: false});
    }
    catch (err){
      console.error(err);
      alert("Can't delete movie from wishlist");
    }

  }


  export {
      auth,
      db,
      db2,
    logOut,
    writeUserData,
    User,
    userConverter,
    addToWishList,
    deleteFromWishList,
    refreshPage
  };


