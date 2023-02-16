const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: `api_key=${process.env.REACT_APP_API_KEY}`,
  originalImage: (imagePath) => `https://image.tmdb.org/t/p/original${imagePath}`,
  w500Image: (imagePath) => `https://image.tmdb.org/t/p/w500${imagePath}`,
  w400Image: (imagePath) => `https://image.tmdb.org/t/p/w400${imagePath}`
}


export default apiConfig;