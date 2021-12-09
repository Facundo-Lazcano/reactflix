import React, { useEffect, useState } from 'react'
import { Box, Image } from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import useScrollPosition from '@react-hook/window-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const HeaderVideo = ({ show, showVideo }) => {
  const [playing, setPlaying] = useState(false)
  const scrollY = useScrollPosition(60 /*fps*/)
  const [muted, setMuted] = useState(true)
  const [rating, setRating] = useState('')
  const [showOverview, setShowOverview] = useState(true)

  const handlePlay = () => {
    scrollY < 10
      ? setTimeout(() => {
          setPlaying(true)
        }, 1000)
      : setPlaying(false)
  }

  const getDetails = async () => {
    if (show) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_TMDB_BASE_URL}/tv/${show.id}/content_ratings?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-ES`
        )
        setRating(`${data.results[0].rating}+`)
      } catch (error) {
        setRating('ATP')
      }
    }
  }

  useEffect(() => {
    handlePlay()
    getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY])

  const handleMute = () => {
    setMuted(!muted)
  }
  return (
    <Box style={styles.container}>
      {showVideo && (
        <Box>
          <Image
            src={`${process.env.REACT_APP_TMDB_HEADER_IMAGE_BASE_URL}${show.backdrop_path}`}
            style={{
              minHeight: '99vh',
              minWidth: '100vw',
              objectFit: 'cover',
              objectPosition: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: playing ? -2 : 0
            }}
          />
          <ReactPlayer
            playing={playing}
            url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${showVideo.key}`}
            style={{
              position: 'absolute',
              top: -100,
              minWidth: '100vw',
              minHeight: '150vh',
              offset: '0 0',
              objectPosition: 'center',
              zIndex: playing ? 0 : -1
            }}
            onEnded={() => {
              setShowOverview(true)
              setPlaying(false)
            }}
            onPlay={() => setTimeout(() => setShowOverview(false), 6000)}
            muted={muted}
            controls={false}
          />
          <Box
            style={{
              minWidth: '100vw',
              minHeight: '100vh',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0
            }}
          >
            <FontAwesomeIcon
              icon={muted ? faVolumeMute : faVolumeUp}
              style={styles.button}
              onClick={handleMute}
            />
            <Box style={styles.title}>{show.original_name}</Box>
            <Box
              style={styles.subtitle}
              color={showOverview ? '#fff' : 'transparent'}
            >
              {show.overview}
            </Box>
            <Box style={styles.rating}>{rating}</Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
const styles = {
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundColor: '#000'
  },
  button: {
    color: '#fff',
    fontSize: '2rem',
    width: '2rem',
    border: '2px solid #fff',
    borderRadius: '50%',
    padding: '0.5rem',
    cursor: 'pointer',
    position: 'absolute',
    top: '70%',
    right: '80px',
    zIndex: 0
  },
  title: {
    color: '#fff',
    fontSize: '5rem',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '10px',
    top: '40%',
    left: '40px',
    fontFamily: 'Netflix Sans Black',
    zIndex: 3
  },
  subtitle: {
    fontSize: '1rem',
    position: 'absolute',
    top: '60%',
    left: '40px',
    zIndex: 3,
    width: '40%',
    fontFamily: 'Netflix Sans Black',
    transition: 'all 0.5s ease-in-out'
  },
  rating: {
    color: '#fff',
    fontSize: '.8rem',
    position: 'absolute',
    top: '70%',
    right: '0',
    width: '5%',
    textAlign: 'left',
    zIndex: 3,
    fontFamily: 'Netflix Sans Regular',
    backgroundColor: '#1F1F1F',
    padding: '0.3rem',
    paddingLeft: '0.5rem',
    borderLeft: '2px solid #fff'
  }
}
export default HeaderVideo
