import useGetDetails from '../../hooks/useGetDetails';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import { ConvertTime } from '../../utility/ConvertTime';
import { BsPlayFill } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';
import MovieCredits from './MovieCredits';

import RenderTrailer from '../../components/renderTrailer/RenderTrailer';

import { ClipLoader } from 'react-spinners';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import loadingPoster from '../../assets/loading_poster--transparent.png';
import placeHolderPoster from '../../assets/placeholder_poster.png';

import './movie-info.scss';



const MovieInfo = ({ getId }) => {
  const [movie, setMovie] = useState(null);
  const [playTrailer, setPlayTrailer] = useState(false);
  const navigate = useNavigate();

  const { data, loading, error } = useGetDetails(getId);

  useEffect(() => {
    setMovie(data)
    console.log(data, 'movie data')

    window.scrollTo({ top: 0 });
  }, [data])


  if (error) {
    navigate('/')
  }

  const renderTitle = () => {
    const logo = movie?.images.logos.length !== 0 ?
      <LazyLoadImage
        effect='blur'
        className='movie-info__logo' src={`${apiConfig.w500Image(movie?.images.logos[0]?.file_path)}`} alt="title" />
      : <h1 className='movie-info__title'>{movie?.title}</h1>

    return logo
  }


  return (
    <>
      <div className='movie-info'
        style={{
          backgroundImage:
            `linear-gradient(0deg, 
            rgba(0,0,0,1) 0%,
            rgba(0,0,0,0.7) 80%,
            rgba(0,0,0,0.6) 100%, 
            rgba(0,0,0,0.5) 100%), 
        url(${apiConfig.originalImage(movie?.backdrop_path)})`
        }}
      >
        {loading ? <ClipLoader color="#FF005F" className='loading' />
          : <div className='movie-info__container'>

            <div className='movie-info__trailer__container'>
              <div className='movie-info__trailer__hover__container'>
                {/* {movie?.videos && playTrailer ? RenderTrailer(movie) : null} */}
                {movie?.videos && playTrailer ?
                  <RenderTrailer
                    movie={movie}
                    setPlayTrailer={setPlayTrailer}
                  />
                  : null}

                <button className='movie-info__trailer__close__btn' onClick={() => setPlayTrailer(false)}>
                  <VscClose className='movie-info__trailer__close__btn--icon' />
                </button>
              </div>
            </div>

            <div className='movie-info__poster-title__container'>

              {movie?.poster_path ?
                <LazyLoadImage
                  className='movie-info__poster'
                  effect='blur'
                  placeholderSrc={loadingPoster}
                  src={apiConfig.w500Image(movie?.poster_path)} alt="movie poster" />
                : <LazyLoadImage
                  effect='blur'
                  placeholderSrc={loadingPoster}
                  src={placeHolderPoster} className='movie-info__poster' alt="" />}


              <div className='movie-info__logo-title__mobile'>
                {renderTitle()}

                <p className='details__date'>
                  {ConvertTime(movie?.release_date)}
                </p>

                <div className='details__genre__container'>
                  {movie?.genres ? movie?.genres.map(genre =>
                    <div className="details__genre--mobile" key={genre.id}>
                      {genre?.name}
                    </div>) : null}
                </div>

              </div>

            </div>

            <button className='movie-info__play-trailer play-trailer__mobile' onClick={() => setPlayTrailer(true)}>
              <BsPlayFill className='play__icon' />
              Play trailer
            </button>

            <div className='movie-info__details'>

              <div className='movie-info__logo-title'>
                {renderTitle()}
              </div>


              <div className='details__date__genre'>

                <p className='details__date'>
                  {ConvertTime(movie?.release_date)}
                </p>

                {movie?.genres ? movie?.genres.map(genre =>
                  <p className="details__genre" key={genre.id}>
                    <span>.</span>
                    {genre?.name}
                  </p>) : null}

              </div>

              <p className='details__overview'>
                {movie?.overview}
              </p>

              <button className='movie-info__play-trailer' onClick={() => setPlayTrailer(true)}>
                <BsPlayFill className='play__icon' />
                Play trailer
              </button>

            </div>

            <p className='details__overview overview__mobile'>
              {movie?.overview}
            </p>

          </div>
        }
      </div>

      {!loading ? <MovieCredits getId={getId} /> : null}

    </>
  )
}

export default MovieInfo