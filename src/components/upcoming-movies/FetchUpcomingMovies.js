import useFetch, { category, params } from "../../hooks/useFetch";

const FetchUpcomingMovies = (page, region) => {

  const { data, totalPage, loading, error } = useFetch(category.upcoming, params.page(page), (region), '')

  return { data, loading, totalPage, error }
}

export default FetchUpcomingMovies