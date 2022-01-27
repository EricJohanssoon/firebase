import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db2, logOut, User, userConverter } from "./Firebase/firebase-config";
import { doc, setDoc, getDoc  } from 'firebase/firestore';
import Tables from "./Tables";
import './styles.css';




function Dashboard({movielist}) {
  const [user, loading] = useAuthState(auth);
  const [filteredMovies, setFilteredMovies] = useState(movielist);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  console.log("going back to dashboard");


  useEffect(() => {
    setFilteredMovies(movielist);
  }, [movielist]);
  
  useEffect(() => {
    if(searchTerm !== ""){
      const filteredByText = movielist.filter(movielist => String(movielist.title+movielist.genre+movielist.year).toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredMovies(filteredByText);
    }
    else{
      setFilteredMovies(movielist);
    }
  }, [searchTerm]);


  const filterMovies = (movieIndex) => {
    const filteredmovie_new =filteredMovies.filter(movielist => (movielist.id!==movieIndex))
    setFilteredMovies(filteredmovie_new);
  };

  useEffect(async () => {
    if (loading) return;
    if (!user) return navigate("/"); 
  


    try{
      const ref = doc(db2, "users", user.uid).withConverter(userConverter);

      // Collecting wishlist
      const docRef = doc(db2, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const wishlist = [];

      // Checking if user is new
      const row = userConverter.fromFirestore(docSnap);
      if (row == undefined){
        await setDoc(ref, new User(user.uid, user.displayName, user.email, wishlist));
        console.log("Adding new user")
      }
      else {
        const wishlist = row.wishlist;
        await setDoc(ref, new User(user.uid, user.displayName, user.email, wishlist));

      const favMovies = movielist;

      wishlist.forEach((index) => {
        favMovies.splice(index,1)
      });
      setFilteredMovies(favMovies);
      
    
      // console.log("Favourite movies ", favMovies);
      // console.log("Displayed movies", filteredMovies);
    }
    }
    catch (err){
      console.error(err);
      alert("Can't add user to database");
    }
  }, [user, loading, movielist]);


  return (
    <div className="dashboard">
      <div className="navbar">
      <h1>Dashboard</h1>
       <div className="dashboard__container">
        <div className="credentials_container_name"> Name: {user?.displayName}</div>
         <div className="buttons">
         <button className="button-6" onClick={() => {navigate("/wishlist")}}>
          Wishlist
         </button>
         <button className="button-6" onClick={() => {logOut(); navigate("/");}}>
          Logout
         </button>


         </div>
   
         
       </div>
       </div>
       <div className="searchField">
       <input 
            type="text"
            id="header-search"
            placeholder="Search after movie..."
            name="s" 
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
        />
        </div>
      <div>
          {(filteredMovies && <Tables movies={filteredMovies} filterMovies={filterMovies}/>) || "Loading movies..."}
        </div>
      </div>  
  );  
  }
  
export default Dashboard;
