import axios from 'axios';
import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';

const useGetDetails = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiConfig.baseUrl}movie/${id}?${apiConfig.apiKey}`, {
        params: {
          append_to_response: 'images,videos',
          include_image_language: 'en'
        }
      })
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [id]);

  return { data, loading, error }
}

export default useGetDetails