import { useEffect } from "react";
import { useState } from "react";
import useGetDetails from "../../hooks/useGetDetails";

import RenderTrailer from "../renderTrailer/RenderTrailer";

const RenderLatestTrailer = ({ id, playTrailer, setPlayTrailer, latest }) => {
  const [movie, setMovie] = useState(null)

  const { data } = useGetDetails(id);

  useEffect(() => {
    setMovie(data)

    if (playTrailer) {
    }
  }, [data])


  return (
    <div className='latest-trailer__modal black__background'>

      <div className="latest-trailer__hover__container">

        {
          movie?.videos && playTrailer ?
            <RenderTrailer
              movie={movie}
              setPlayTrailer={setPlayTrailer}
              latest={latest}
            />
            : null
        }

      </div>
    </div>
  )
}

export default RenderLatestTrailer