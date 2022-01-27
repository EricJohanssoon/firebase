import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc  } from 'firebase/firestore';
import Tables2 from "./Tables2";
import { auth, db, db2, logOut, writeUserData,User, userConverter } from "./Firebase/firebase-config";
import Navbar from "./Navbar";

function Wishlist({movielist}) {
  const [user, loading] = useAuthState(auth);
  const [name] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [wishListMovies, setWishlistMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const filterMovies = (movieIndex) => {
    const filteredmovie_new =filteredMovies.filter(movie => (movie.id!==movieIndex))
    setFilteredMovies(filteredmovie_new);
  };

  useEffect(() => {
    if(searchTerm !== ""){
      const filteredByText = filteredMovies.filter(movielist => String(movielist.title+movielist.genre+movielist.year).toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredMovies(filteredByText);
    }
    else{
      setFilteredMovies(wishListMovies);
      console.log("Filtered movies", filteredMovies);
    }
  }, [searchTerm]);


  useEffect(async () => {
    if (loading) return;
    if (!user) return navigate("/");

    if(movielist.length!==0){
    try{
      const docRef = doc(db2, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const row = userConverter.fromFirestore(docSnap);
      const wishlist = row.wishlist;
      const filtered = [];
      wishlist.forEach((index) => {
        const movie = movielist[index];
        filtered.push(movie);
      });
      setWishlistMovies(filtered);
      setFilteredMovies(filtered);

    }
    catch (err){
      console.error(err);
      alert("Can't collect wishlist movies");
    }
  }
}, [user, loading, movielist]);


  return (
    <div className="wishlist">
      <div className="navbar">
        <h1>Wishlist</h1>
       <div className="wishlist_container">
         <div className="credentials_container_name">Name: {user?.displayName}</div>
         <div className="buttons">
         <button className="button-6" onClick={() => {navigate("/dashboard")}}>
          Dashboard
         </button>
         <button className="button-6" onClick={logOut}>
          Logout
         </button>
         </div>
        </div>
       </div>
       <div className="searchField">
       <input 
            type="text"
            id="header-search"
            placeholder="Search after movie"
            name="s" 
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
        />
        </div>
       <div className="movieTables">
          {(filteredMovies && <Tables2 movies={filteredMovies} filterMovies={filterMovies}/>) || "Loading movies.."}
        </div>
     </div>
  );
}
export default Wishlist;