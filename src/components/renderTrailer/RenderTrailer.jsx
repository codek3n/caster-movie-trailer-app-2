import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { CgClose } from 'react-icons/cg';

import './render-trailer.scss';

const RenderTrailer = ({ movie, setPlayTrailer, latest }) => {
  const [closeButton, setCloseButton] = useState(false);
  const [item, setItem] = useState(null)

  useEffect(() => {
    setItem(movie)
    console.log(movie, 'here')
  }, [movie])

  // close button ---

  const closeButtonOff = () => {
    setCloseButton(false)
  }

  const closeButtonShow = () => {

    if (!closeButton) {
      setCloseButton(true);
      setTimeout(closeButtonOff, 6000);
    }
  }

  const trailer = item?.videos.results
    .find(vid => vid.name === 'Official Trailer' ? vid.name == 'Official Trailer'
      : vid.name == 'Official Teaser Trailer' || vid.name == 'Official Teaser');

  const trailerLatest = item?.videos.results
    .find(vid => vid.name === 'Official Trailer' ?
      vid.name == 'Official Trailer' || vid.name == 'Official Teaser Trailer'
      : vid.name == 'Official Teaser' || vid.name);

  return (

    <div className="render-trailer" onMouseMove={() => closeButtonShow()}
      onTouchMove={() => closeButtonShow()}>

      <div className="render-trailer__container" onMouseMove={() => closeButtonShow()}
        onTouchMove={() => closeButtonShow()}>

        <button
          className={closeButton ? "render-trailer__close__btn close--active"
            : "render-trailer__close__btn"}
          onClick={() => setPlayTrailer(false)}>
          <CgClose className="render-trailer__close--icon" />
        </button>

        <YouTube
          // videoId={trailer?.key}
          videoId={!latest ? trailer?.key : trailerLatest?.key}
          iframeClassName='youtube-box'
          opts={{
            playerVars: {
              autoplay: 1,
              controls: 1,
              loop: 1,
              color: "white",
              modestbranding: 1,
              rel: 0,
              playsinline: 0
            }
          }}
        />

      </div>
    </div>
  )
}

export default RenderTrailer