import { useState, useCallback, useEffect } from 'react';
import apiConfig from "../../api/apiConfig"
import FetchUpcomingMovies from "../upcoming-movies/FetchUpcomingMovies";
import { BsPlayFill } from 'react-icons/bs';
import { BsPlay } from 'react-icons/bs';
import './latest-trailer.scss';

import slideButton from '../../assets/svg/Next-btn.svg';

import RenderLatestTrailer from './RenderLatestTrailer';


const LatestTrailer = () => {
  const [movieTrailers, setMovieTrailers] = useState(null);
  const [hideButtonNext, setHideButtonNext] = useState(false);
  const [hideButtonPrev, setHideButtonPrev] = useState(true);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [bigPoster, setBigPoster] = useState(0);
  const [id, setId] = useState()

  const [latest, setLatest] = useState(false);

  const { data, error } = FetchUpcomingMovies(1, '');

  useEffect(() => {
    setMovieTrailers(data)
    console.log(data)
  }, [data])


  if (error) {
    console.log(error)
  }

  const scrollPath = document.querySelector('.latest-trailer__carousel');
  const cardContainer = document.querySelector('.card__poster');

  const slideNext = () => {
    scrollPath?.scrollBy({
      top: 0,
      left: 500,
      behavior: 'smooth',
    })

    if (scrollPath) {
      setBigPoster(prevIndex => prevIndex + 1)
    }

    if (scrollPath?.scrollLeft > scrollPath?.scrollWidth - cardContainer?.offsetWidth * 2) {
      setBigPoster(17)
    }
  }

  const slidePrev = () => {
    scrollPath.scrollBy({
      top: 0,
      left: - 500,
      behavior: 'smooth'
    })

    if (scrollPath) {
      setBigPoster(prevIndex => prevIndex - 1)
    }

    if (scrollPath?.scrollLeft === 0) {
      setBigPoster(0)
    }
  }

  const selectMovie = useCallback(async (movie) => {
    await setId(movie.id)
    setPlayTrailer(true)
    setLatest(true)
  }, [id])


  return (
    <div className='latest-trailer' id='#tailer-latest'>

      <div className='latest-trailer__container'>
        <h1 className="latest-trailer__header">Latest trailer</h1>

        <div className='latest-trailer__big-poster'
          style={movieTrailers ? {
            backgroundImage:
              `linear-gradient(0deg, 
                rgba(0,0,0,1) 0%,
                rgba(0,0,0,0.3225665266106442) 80%,
                rgba(0,0,0,0.2721463585434174) 100%, 
                rgba(0,0,0,0.30015756302521013) 100%), 
            url(${apiConfig.originalImage(movieTrailers[bigPoster]?.backdrop_path)})`
          } : null}>

          {movieTrailers ?
            <h1 className="big-poster__title">{movieTrailers[bigPoster]?.title}</h1>
            : null}

          <button className='big-poster__btn' onClick={() => selectMovie(movieTrailers[bigPoster])}>
            <BsPlayFill className="big-poster__play__icon" />
          </button>

        </div>

        <div className='latest-trailer__carousel snap__inline'>
          {movieTrailers?.map(movieTrailer => (
            <div className="carousel__card" key={movieTrailer.id}>
              <img className="card__poster" src={apiConfig.w500Image(movieTrailer.backdrop_path)} alt="movie poster" />

              <button className='card__play-btn' onClick={() => selectMovie(movieTrailer)}>
                <BsPlay className="card__play-icon" />
              </button>

              <h2 className="card__title">{movieTrailer.title}</h2>
            </div>
          ))}
        </div>

      </div>

      <div className='latest-trailer__btn mobile__btn__hidden'>

        <button onClick={slidePrev} className={hideButtonPrev ? 'btn__prev btn__hidden' : 'btn__prev'}>
          <img src={slideButton} alt='previous button' />
        </button>

        <button onClick={slideNext} className={hideButtonNext ? 'btn__next btn__hidden' : 'btn__next'}>
          <img src={slideButton} alt='next button' />
        </button>

      </div>

      <RenderLatestTrailer
        id={id}
        playTrailer={playTrailer}
        setPlayTrailer={setPlayTrailer}
        latest={latest}
      />

    </div>
  )
}

export default LatestTrailer