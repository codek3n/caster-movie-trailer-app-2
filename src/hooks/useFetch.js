import axios from 'axios';
import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';

export const category = {
  popular: 'movie/popular?',
  trendingWeek: 'trending/movie/week?',
  trendingDay: 'trending/movie/day?',
  upcoming: 'movie/upcoming?',
  search: 'search/movie?',
}

export const searchQuery = {
  queryValue: (query) => `&query=${query}`
}

export const params = {
  page: (pageNumber) => `&page=${pageNumber}`,
  language: (language) => `&language=${language}`,
}


const useFetch = (type, page, region, searchQuery) => {
  const [data, setData] = useState(null);
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiConfig.baseUrl}${type}${apiConfig.apiKey}${page}${region}${searchQuery}`, {
        params: {
          include_image_language: 'en',
        }
      })
      .then((response) => {
        setData(response.data.results)
        setTotalPage(response.data.total_pages)
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [type, page, searchQuery]);


  return { data, totalPage, setTotalPage, loading, error };
}

export default useFetch