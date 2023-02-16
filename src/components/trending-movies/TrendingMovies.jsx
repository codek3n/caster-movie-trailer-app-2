import React, { useState, useEffect } from 'react';
import useFetch, { category, params } from '../../hooks/useFetch';
import apiConfig from '../../api/apiConfig';
import slideButton from '../../assets/svg/Next-btn.svg';
import './trending-movies.scss';


const TrendingMovies = ({ getDetails }) => {
  const [trendingMovies, setTrendingMovies] = useState(null)
  const [hideButtonNext, setHideButtonNext] = useState(false);
  const [hideButtonPrev, setHideButtonPrev] = useState(true);

  const { data, loading, error } = useFetch(category.trendingWeek, params.page(1), '', '')

  useEffect(() => {
    setTrendingMovies(data)
    console.log(data, 'trending')
  }, [data])

  if (loading) {
    <h1>Loading..</h1>
  }

  if (error) {
    console.log(error)
  }

  // slider button ----------

  const slider = document.querySelector('.trending-movies__grid');

  const slideLeft = () => {
    const cardContainer = document.querySelector('.trending-movies__card');
    slider.scrollBy({
      top: 0,
      left: - slider.offsetWidth + cardContainer.offsetWidth,
      behavior: 'smooth'
    })

    if (slider?.scrollLeft < slider.offsetWidth + cardContainer.offsetWidth) {
      setHideButtonPrev(true)
    } else if (slider?.scrollLeft > slider?.offsetWidth - cardContainer?.offsetWidth * 2) {
      setHideButtonNext(false)
    }
  }

  const slideRight = () => {
    const cardContainer = document.querySelector('.trending-movies__card');
    slider.scrollBy({
      top: 0,
      left: slider?.offsetWidth - cardContainer?.offsetWidth,
      behavior: 'smooth'
    })

    if (slider?.scrollLeft > slider?.offsetWidth - cardContainer?.offsetWidth * 2) {
      setHideButtonNext(true)
    } else if (slider?.scrollLeft > !slider?.offsetWidth - cardContainer?.offsetWidth * 2) {
      setHideButtonPrev(false)
    }
  }


  return (
    <div className='trending-movies'>

      <h1 className='trending-movies__header'>Trending movies</h1>

      <div className='trending-movies__grid snap__inline'>

        {trendingMovies?.map(trendingMovie => (

          <div className='trending-movies__card' key={trendingMovie.id} onClick={() => getDetails(trendingMovie)}>

            <img className='trending-movies__card__poster'
              src={apiConfig.w500Image(trendingMovie.poster_path)} alt="movie poster"
            />

            <h2 className='trending-movies__card__title'>
              {trendingMovie.title}
            </h2>

          </div>
        ))}

      </div>

      <div className='trending-movies__btn'>

        <button onClick={slideLeft} className={hideButtonPrev ? 'btn__prev btn__hidden' : 'btn__prev'}>
          <img src={slideButton} alt='previous button' />
        </button>

        <button onClick={slideRight} className={hideButtonNext ? 'btn__next btn__hidden' : 'btn__next'}>
          <img src={slideButton} alt='next button' />
        </button>

      </div>

    </div>
  )
}

export default TrendingMovies