import React from "react";
import { firebase } from "./Firebase/firebase";

const SignIn =()=>{
    
    const SignInWithFirebase =()=>{
        var google_provider = firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(google_provider)
        .then((re)=>{
            console.log(re);
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    return(
        <button onClick={SignInWithFirebase}>Sign in with Google</button>
    )
}
export default SignIn