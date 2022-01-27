import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth, logOut } from "./Firebase/firebase-config.js";


const NavBar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    setUserName(user.displayName);
  }, [user, loading])

  return (
    <div className="mid">
    <ul className="navbar">
      <li>
        {userName}
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/wishlist">Wishlist</Link>
      </li>
      <li>
        <button onClick={logOut} className="signOutButton" role="button">Sign out</button>
      </li>
      </ul>     
    </div>
  );
};

export default NavBar;