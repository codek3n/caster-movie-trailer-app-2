import axios from 'axios';
import { useState, useEffect } from 'react';
import apiConfig from '../../api/apiConfig';
import './movie-credits.scss';
import slideButton from '../../assets/svg/Next-btn.svg';
import placeHolderPoster from '../../assets/placeholder_poster.png';

const MovieCredits = ({ getId }) => {
  const [details, setDetails] = useState([]);
  const [hideButtonNext, setHideButtonNext] = useState(false);
  const [hideButtonPrev, setHideButtonPrev] = useState(true);


  const fullCredits = async () => {
    const data = await axios
      .get(`${apiConfig.baseUrl}movie/${getId}/credits?${apiConfig.apiKey}`)
      .catch(err => console.log(err))

    setDetails(data?.data.cast)
  }

  useEffect(() => {
    fullCredits()
  }, [getId])

  // slider button ----------

  const slider = document.querySelector('.cast__grid');

  const slideLeft = () => {
    const cardContainer = document.querySelector('.cast__card');
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

    // if (slider?.scrollLeft - slider?.offsetWidth < !slider?.offsetWidth - cardContainer?.offsetWidth) {
    //   setHideButtonPrev(true)
    // } else if (slider?.scrollLeft - slider?.offsetWidth > slider?.offsetWidth - cardContainer?.offsetWidth * 2) {
    //   setHideButtonNext(false)
    // }

  }

  const slideRight = () => {
    const cardContainer = document.querySelector('.cast__card');
    slider.scrollBy({
      top: 0,
      left: slider?.offsetWidth - cardContainer?.offsetWidth,
      behavior: 'smooth'
    })

    if (slider?.scrollLeft + slider?.offsetWidth > slider?.scrollWidth - slider?.offsetWidth) {
      setHideButtonNext(true)
    } else if (slider?.scrollLeft + slider?.offsetWidth > !slider?.scrollWidth - slider?.offsetWidth) {
      setHideButtonPrev(false)
    }
  }


  return (
    <div className='movie-credits'>

      <h1 className='movie-credits__header'>Cast of the movie</h1>

      <div className='cast__grid snap__inline'>

        {details?.map(cast => (
          <div className='cast__card' key={cast.id}>

            {cast.profile_path ?
              <img className='card__picture' src={apiConfig.w500Image(cast.profile_path)} alt="profile picture" />
              : <img className='card__picture' src={placeHolderPoster} alt="" />}

            <h2 className='card__name'>{cast.name}</h2>
            <h2 className='card__character'>{cast.character}</h2>

          </div>
        ))}

      </div>

      <div className='movie-credits__slider__btn'>

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

export default MovieCredits