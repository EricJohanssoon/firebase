import React from 'react';
import { auth } from './Firebase/firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";
import {deleteFromWishList, addToWishList} from "./Firebase/firebase-config";
import { useNavigate } from "react-router-dom";



const TableRow = ({ movie, filterMovies }) => {
    const [user, loading] = useAuthState(auth);
  return (
    <tr>
      <td>{movie.title}</td>
      <td>{movie.year}</td>
      <td>{movie.genre}</td>
      <td><button className="button-5" onClick={() => { deleteFromWishList(user, movie.id); filterMovies(movie.id);}}>
          Delete From WishList
          </button></td> 
    </tr>
  )
}
// <i class="fas fa-heart"></i>

const Tables2 = ({ movies, filterMovies }) => {
 
  console.log("movieList in Tables2", movies);
  const navigate = useNavigate();

  if (movies.length==0){
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Delete from wishlist</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <div className='noMovies'>
          <h1>No movies in wishlist!</h1>
          <button className="button-5" onClick={() => {navigate("/dashboard")}}>
            Dashboard
          </button>
        </div>
      </div>
    )
  }


  else {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Delete from wishlist</th>
            </tr>
          </thead>
          <tbody>
              {movies.map(movie => <TableRow key={movie.id} movie={movie} filterMovies={filterMovies} />)}  
          </tbody>
        </table>
      </div>
    )
}
}

export default Tables2;