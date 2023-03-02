import React, { useEffect, useState, useCallback } from 'react';
import useFetch, { category, params } from '../../hooks/useFetch';
import apiConfig from '../../api/apiConfig';
import NextButton from '../../assets/svg/Next-btn.svg';
import './top-movies.scss';


const TopMovies = ({ setId, id }) => {
  const [topMovies, setTopMovies] = useState(null)
  const [hideButtonNext, setHideButtonNext] = useState(false);
  const [hideButtonPrev, setHideButtonPrev] = useState(true);

  const { data, error } = useFetch(category.trendingDay, params.page(1), '', '')

  const renderMovies = () => {
    const movies = data?.filter((item, index) => {
      return index <= 9
    })

    setTopMovies(movies)
  }

  if (error) {
    console.log(error)
  }


  useEffect(() => {
    renderMovies()

    if (data?.length) {
      setId(data[0].id)
    }
  }, [data])

  const selectMovie = useCallback(async (movie) => {
    await setId(movie.id)
  }, [id])


  // button ------------

  const slider = document.querySelector('.top-movies__grid');
  const cardContainer = document.querySelector('.top-movies__card');

  const slidePrev = () => {
    let currentPosition = slider?.scrollLeft;

    slider?.scrollBy({
      top: 0,
      left: - slider?.offsetWidth + cardContainer?.offsetWidth,
      behavior: 'smooth',
    })

    if (currentPosition < slider?.offsetWidth + cardContainer?.offsetWidth) {
      setHideButtonPrev(true)
    } else if (currentPosition > slider.offsetWidth - cardContainer.offsetWidth) {
      setHideButtonNext(false)
    }
  }

  const slideNext = () => {
    let currentPosition = slider?.scrollLeft;

    slider?.scrollBy({
      top: 0,
      left: slider?.offsetWidth - cardContainer?.offsetWidth,
      behavior: 'smooth',
    })

    if (currentPosition > slider?.offsetWidth - cardContainer?.offsetWidth * 3) {
      setHideButtonNext(true)
    } else if (currentPosition > !slider?.offsetWidth - cardContainer?.offsetWidth) {
      setHideButtonPrev(false)
    }
  }

  return (
    <div className='top-movies'>
      <h1 className='top-movies__header'>Top 10 movies today</h1>

      <div className='top-movies__grid snap__inline'>

        {topMovies?.map(topMovie => (

          <div className='top-movies__card' key={topMovie.id} onClick={() => selectMovie(topMovie)}>

            <img className='top-movies__card__poster'
              src={apiConfig.w400Image(topMovie.poster_path)}
              alt="movie poster"
            />

            <h2 className='top-movies__card__title'>
              {topMovie.title}
            </h2>

          </div>

        ))}

      </div>
      <div className='top-movies__btn'>

        <button onClick={slidePrev} className={hideButtonPrev ? 'btn__prev btn__hidden' : 'btn__prev'}>
          <img src={NextButton} alt="" />
        </button>

        <button onClick={slideNext} className={hideButtonNext ? 'btn__next btn__hidden' : 'btn__next'}>
          <img src={NextButton} alt="" />
        </button>

      </div>

    </div>
  )
}

export default TopMovies