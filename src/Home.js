import {signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import { auth } from './Firebase/firebase-config';

import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";

import Logo from './logo.png';


function Home() {

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

    const signInWithGoogle = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((re)=>{
          console.log(re);
          const credential = GoogleAuthProvider.credentialFromResult(re);
          //const token = credential.accessToken;
          // The signed-in user info.
          //const user = re.user;
    
        })
        .catch((err)=>{
          console.log(err)
        })
    
      }
  
    

    return (
        <div className='App'>
          <h1> Movies Room</h1>
          <button className="button-5" onClick={signInWithGoogle}>
            Sign In
          </button>
        <div>
          <img src={Logo} />
        </div>
          
        </div>
      );
    }
    
export default Home;