import useGetDetails from "../../hooks/useGetDetails";
import { useState, useEffect } from "react";
import apiConfig from "../../api/apiConfig";
import TopMovies from "../top-movies/TopMovies";
import { ConvertTime } from "../../utility/ConvertTime";
import { BsPlayFill } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';
import { HiOutlineInformationCircle } from 'react-icons/hi';

import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import RenderTrailer from "../renderTrailer/RenderTrailer";

import './hero.scss';

const Hero = ({ getDetails }) => {
  const [movie, setMovie] = useState(null)
  const [playTrailer, setPlayTrailer] = useState(false);
  const [id, setId] = useState(null)

  const { data } = useGetDetails(id);

  useEffect(() => {
    setMovie(data)
  }, [data])

  const renderTitle = () => {

    const logo = movie?.images.logos.length !== 0 ?
      <LazyLoadImage
        className="hero__logo"
        effect="blur"
        src={`${apiConfig.w500Image(movie?.images.logos[0]?.file_path)}`} alt="title" />
      : <h1 className="hero__title">{movie?.title}</h1>

    return logo
  }


  return (
    <>
      <div className='hero'
        style={{
          backgroundImage:
            `linear-gradient(0deg, 
                rgba(0,0,0,1) 0%,
                rgba(0,0,0,0.3225665266106442) 80%,
                rgba(0,0,0,0.2721463585434174) 100%, 
                rgba(0,0,0,0.30015756302521013) 100%),
            url(${apiConfig.originalImage(movie?.backdrop_path)})`
        }}
      >
        <div className='hero__trailer__container'>
          <div className="hero__trailer__hover__container">

            {/* {movie?.videos && playTrailer ? RenderTrailer(movie) : null} */}
            {movie?.videos && playTrailer ?
              <RenderTrailer
                movie={movie}
                setPlayTrailer={setPlayTrailer}
              />
              : null}

            <button className="hero__trailer__close__btn" onClick={() => setPlayTrailer(false)}>
              <VscClose className="hero__trailer__close__btn--icon" />
            </button>
          </div>

        </div>

        <div className="hero__container">

          <div className="hero__movie__info">
            {renderTitle()}

            <div className="hero__date__genre">

              <p className="hero__date">{ConvertTime(movie?.release_date)}</p>

              {movie?.genres ? movie?.genres.map(genre =>
                <p className="hero__genre" key={genre.id}>
                  <span>.</span>
                  {genre?.name}
                </p>) : null}

            </div>

            <p className="hero__overview">
              {movie?.overview}
            </p>

          </div>

        </div>

        <div className="hero__btn">

          <button className="hero__btn__more-info" onClick={() => getDetails(movie)}>
            <HiOutlineInformationCircle className="more-info--icon" />
            More info
          </button>

          <button className="hero__btn__play-trailer" onClick={() => setPlayTrailer(true)}>
            <BsPlayFill className="play__icon" />
            Play trailer
          </button>

        </div>

      </div >

      <TopMovies
        setId={setId}
        id={id}
      />

    </>
  )
}

export default Hero