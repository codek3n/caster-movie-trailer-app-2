// import FetchUpcomingMovies from "../../components/upcoming-movies/FetchUpcomingMovies";
import { useEffect, useState } from "react";
import FetchUpcomingMovies from "../../components/upcoming-movies/FetchUpcomingMovies";
import apiConfig from "../../api/apiConfig";
import { ClipLoader } from 'react-spinners';
import Pagination from "../../components/pagination/Pagination";

import { LazyLoadImage } from "react-lazy-load-image-component";
import loadingPoster from '../../assets/loading_poster--transparent.png';
import placeHolderPoster from '../../assets/placeholder_poster.png';

import './upcoming-movies-d2.scss';

const UpcomingMovies = ({ getDetails, pageNumber, setPageNumber }) => {
  const [upcomingMovies, setUpcomingMovies] = useState(null)

  const { data, totalPage, loading, error } = FetchUpcomingMovies(pageNumber, '&region=US,PH');

  useEffect(() => {
    setUpcomingMovies(data)

    window.scrollTo({ top: 0 })
  }, [data])


  if (error) {
    console.log(error)
  }

  return (
    <div className="upcoming-movies--d2">
      {loading ? <ClipLoader color="#FF005F" className='loading' />

        : <div className="upcoming-movies--d2__container">

          <div className="upcoming-movies--d2__grid">

            {upcomingMovies?.map(upcomingMovie => (
              <div className="upcoming-movies--d2__card" key={upcomingMovie.id} onClick={() => getDetails(upcomingMovie)}>
                {upcomingMovie.poster_path ?
                  <LazyLoadImage
                    effect="blur"
                    placeholderSrc={loadingPoster}
                    className="card__poster" src={apiConfig.w500Image(upcomingMovie.poster_path)} alt="movie poster" />
                  : <img src={placeHolderPoster} className='card__poster' alt="" />}

                <h2 className="card__title">
                  {upcomingMovie.title}
                </h2>
              </div>
            ))}

          </div>

          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalPage={totalPage}
          />
        </div>


      }
    </div>
  )
}

export default UpcomingMovies