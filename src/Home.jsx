import React from "react";
import { firebase } from "./Firebase/firebase";
const Home =()=>{
    const signOut =()=>{
        firebase.auth().signOut();
    }

    return(
        <>
            <h1>Home</h1>
            <button onClick={signOut}>Sign Out</button>
        </>
    )
}

export default Home