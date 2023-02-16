import { useState, useEffect } from 'react';
import useFetch, { category, params } from '../../hooks/useFetch';
import apiConfig from '../../api/apiConfig';
import { ConvertTime } from '../../utility/ConvertTime';
import { useNavigate } from 'react-router-dom';
import dividerMobile from '../../assets/svg/card_divider_mobile.svg';

import './popular-movies.scss';

const PopularMovies = ({ getDetails, setPageNumber }) => {
  const [popularMovies, setPopularMovies] = useState(null)
  const navigate = useNavigate();

  const { data, error } = useFetch(category.popular, params.page(3), '', '')

  const renderMovies = () => {
    const movies = data?.filter((item, index) => {
      return index <= 3
    })

    setPopularMovies(movies)
    console.log(movies, 'popular display 1')
  }

  useEffect(() => {
    renderMovies()
  }, [data])

  if (error) {
    console.log(error)
  }

  const seeAll = () => {
    setPageNumber(1)
    navigate('/popular')
  }


  return (
    <div className='popular-movies'>

      <div className='popular-movies__header'>
        <h1 className='header__title'>Popular movies</h1>
        {/* <button className='header__btn--see-all' onClick={() => { navigate('/popular') }}> */}
        <button className='header__btn--see-all' onClick={() => seeAll()}>
          See all
        </button>
      </div>

      <div className='popular-movies__grid'>

        {popularMovies?.map(popularMovie => (
          <div className='popular-movies__card' key={popularMovie.id} onClick={() => getDetails(popularMovie)}>
            <img className='card__divider__mobile' src={dividerMobile} alt="" />
            <img className='card__poster' src={apiConfig.originalImage(popularMovie.backdrop_path)} alt="movie poster" />

            <div className='card__details'>
              <h2 className='card__details--title'>{popularMovie.title}</h2>
              <p className='card__details--date'>{ConvertTime(popularMovie.release_date)}</p>
            </div>
          </div>
        ))}

      </div>

      {/* <button className='header__btn--see-all btn__mobile' onClick={() => { navigate('/popular') }}> */}
      <button className='header__btn--see-all btn__mobile' onClick={() => seeAll()}>
        See all
      </button>

    </div>
  )
}



export default PopularMovies