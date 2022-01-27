import React from 'react';
import { auth } from './Firebase/firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";
import {addToWishList} from "./Firebase/firebase-config"



const TableRow = ({ movie, filterMovies }) => {
    const [user, loading] = useAuthState(auth);
  return (
    <tr>
      <td>{movie.title}</td>
      <td>{movie.year}</td>
      <td>{movie.genre}</td>
      <td><button className="button-5" onClick={() => {addToWishList(user, movie.id); filterMovies(movie.id);}}>
          Add to WishList 
          </button></td> 
    </tr>
  )
}

const Tables = ({ movies, filterMovies }) => {
 

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Add to wishlist</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => <TableRow key={movie.id} movie={movie} filterMovies={filterMovies} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Tables;