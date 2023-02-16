
import { useState, useEffect } from "react";
import useFetch, { category, params } from "../../hooks/useFetch";
import apiConfig from "../../api/apiConfig";
import { ClipLoader } from 'react-spinners';
import Pagination from "../../components/pagination/Pagination";

import { LazyLoadImage } from "react-lazy-load-image-component";
import loadingPoster from '../../assets/loading_poster--transparent.png';
import placeHolderPoster from '../../assets/placeholder_poster.png';

import './popular.scss';

const Popular = ({ getDetails, pageNumber, setPageNumber }) => {
  const [popularMovies, setPopularMovies] = useState(null);


  const { data, totalPage, setTotalPage, loading, error } = useFetch(category.popular, params.page(pageNumber), '', '')

  useEffect(() => {
    setPopularMovies(data)
    setTotalPage(100)
    console.log(data, 'popular')

    window.scrollTo({ top: 0 })
  }, [data])


  return (
    <div className="popular-movies--d2">
      {loading ? <ClipLoader color="#FF005F" className='loading' />
        : <div className="popular-movies--d2__container">

          <div className="popular-movies--d2__grid">

            {popularMovies?.map(popularMovie => (
              <div className="popular-movies--d2__card" key={popularMovie.id} onClick={() => getDetails(popularMovie)}>

                {popularMovie.poster_path ?
                  <LazyLoadImage
                    effect="blur"
                    placeholderSrc={loadingPoster}
                    className="card__poster" src={apiConfig.w500Image(popularMovie.poster_path)} alt="movie poster" />
                  : <img src={placeHolderPoster} className='card__poster' alt="" />
                }

                <h2 className="card__title">
                  {popularMovie.title}
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

export default Popular