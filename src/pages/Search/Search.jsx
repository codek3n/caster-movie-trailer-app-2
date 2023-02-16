import { useState, useEffect } from "react";
import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ClipLoader } from 'react-spinners';
import Pagination from "../../components/pagination/Pagination";
import useFetch, { category, params, searchQuery } from "../../hooks/useFetch";


import loadingPoster from '../../assets/loading_poster--transparent.png';
import placeHolderPoster from '../../assets/placeholder_poster.png';

import './search.scss';



const Search = ({ query, getDetails, pageNumber, setPageNumber }) => {
  const [movies, setMovies] = useState(null);
  const navigate = useNavigate();


  const { data, totalPage, loading } = useFetch(category.search, params.page(pageNumber), '', searchQuery.queryValue(query))

  useEffect(() => {
    setMovies(data)
    console.log(data, 'bagong search')
    console.log(totalPage)

    if (query.length === 0) {
      navigate('/')
    }

    window.scrollTo({ top: 0 })
  }, [data])


  return (
    <div className="search-results">
      {loading ? <ClipLoader color="#FF005F" className='search-results__loading' />
        : <div className="search-results__container">


          <div className="search-results__grid">

            {movies?.map(movie => (
              <div className="search-results__card" key={movie.id} onClick={() => getDetails(movie)}>

                {movie.poster_path ?
                  <LazyLoadImage
                    effect="blur"
                    placeholderSrc={loadingPoster}
                    className='card__poster' src={apiConfig.w500Image(movie.poster_path)} alt="" />
                  : <img src={placeHolderPoster} className='card__poster' alt="" />
                }

                <h2 className='card__title'>
                  {movie.title}
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



export default Search