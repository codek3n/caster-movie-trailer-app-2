import React, { useState, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import UpcomingMovies from '../pages/Upcoming/UpcomingMovies';
import Popular from '../pages/Popular/Popular';
import MovieInfo from '../pages/Movie-info/MovieInfo';
import { useNavigate } from 'react-router-dom';


const Directory = ({ query, pageNumber, setPageNumber }) => {

  const [getId, setGetId] = useState('');


  const navigate = useNavigate();

  const getDetails = (movie) => {
    navigate('/movie_information');
    setGetId(movie.id)
  }


  return (
    <Routes>

      <Route path='/' element={
        <Home
          getDetails={getDetails}
          setPageNumber={setPageNumber}
        />
      } />

      <Route path='/search' element={
        <Search
          query={query}
          getDetails={getDetails}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber} />
      } />

      <Route path='/upcoming' element={
        <UpcomingMovies
          getDetails={getDetails}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber} />
      } />

      <Route path='/popular' element={
        <Popular
          getDetails={getDetails}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber} />
      } />

      <Route path='/movie_information' element={
        <MovieInfo getId={getId} />
      } />

    </Routes>
  )
}

export default Directory