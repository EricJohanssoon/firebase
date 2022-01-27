
import './App.css';
import Home from './Home';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wishlist from './Wishlist';
import React, { useEffect, useState } from "react";
import { auth, db, db2, logOut, writeUserData,User, userConverter } from "./Firebase/firebase-config";
import { set, ref, onValue } from "firebase/database";



function App() {
  const [movielist, setMovieList] = useState([]);
  
  useEffect(() => {
    onValue(ref(db, "/"), (snapshot) => {
      const data = snapshot.val()["movies-list"];
      setMovieList(data);
    }, {
      onlyOnce: true
    });

  },[])


  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard movielist={movielist} />} />
          <Route exact path="/wishlist" element={<Wishlist movielist={movielist}  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
