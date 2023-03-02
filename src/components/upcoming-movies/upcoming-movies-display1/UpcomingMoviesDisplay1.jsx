import { useState, useEffect } from "react";
import FetchUpcomingMovies from "../FetchUpcomingMovies";
import apiConfig from "../../../api/apiConfig";
import './upcoming-movies-d1.scss';
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

// import { Today } from "../../../utility/Today";

const UpcomingMoviesDisplay1 = ({ getDetails, setPageNumber }) => {
  const [upcomingMovies, SetUpcomingMovies] = useState(null)
  const navigate = useNavigate();

  const { data, error } = FetchUpcomingMovies(1, '&region=US');

  const renderMovies = () => {

    const movies = data?.filter((results, index) => {
      return index <= 11
    })

    SetUpcomingMovies(movies)
  }

  useEffect(() => {
    renderMovies()
  }, [data])


  if (error) {
    console.log(error)
  }

  const seeAll = () => {
    setPageNumber(1)
    navigate('/upcoming')
  }


  return (
    <div className='upcoming-movies--d1'>

      <div className='upcoming-movies--d1__header'>
        <h1 className='header__title'>Upcoming movies</h1>
        {/* <button className='header__btn--see-all' onClick={() => { navigate('/upcoming') }}> */}
        <button className='header__btn--see-all' onClick={() => seeAll()}>
          See all
        </button>
      </div>

      <div className='upcoming-movies--d1__grid'>
        {upcomingMovies?.map(upcomingMovie => (
          <div className='upcoming-movies--d1__card' key={upcomingMovie.id} onClick={() => getDetails(upcomingMovie)}>
            <img className='card__poster' src={apiConfig.w500Image(upcomingMovie.poster_path)} alt="movie poster" />
            <h2 className='card__title'>{upcomingMovie.title}</h2>
          </div>
        ))}

      </div>

      {/* <button className='header__btn--see-all btn__mobile' onClick={() => { navigate('/upcoming') }}> */}
      <button className='header__btn--see-all btn__mobile' onClick={() => seeAll()}>
        See all
      </button>

    </div>
  )
}

export default UpcomingMoviesDisplay1