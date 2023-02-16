import Hero from "../../components/hero/Hero";
import TrendingMovies from "../../components/trending-movies/TrendingMovies";
import PopularMovies from "../../components/popular-movies/PopularMovies";
import UpcomingMoviesDisplay1 from "../../components/upcoming-movies/upcoming-movies-display1/UpcomingMoviesDisplay1";
import LatestTrailer from "../../components/latest-trailer/LatestTrailer";

const Home = ({ getDetails, setPageNumber }) => {


  return (
    <div>
      <Hero getDetails={getDetails} />
      <TrendingMovies getDetails={getDetails} />
      <PopularMovies getDetails={getDetails} setPageNumber={setPageNumber} />
      <UpcomingMoviesDisplay1 getDetails={getDetails} setPageNumber={setPageNumber} />
      <LatestTrailer />
    </div>
  )
}

export default Home