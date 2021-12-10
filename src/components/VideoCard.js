import { Box, Wrap } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faPlayCircle,
  faVolumeMute,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { genres } from '../utils/genres'

const VideoCard = ({ movie, hover }) => {
  const [loading, setLoading] = useState(false)
  const [muted, setMuted] = useState(true)
  const [key, setKey] = useState('')
  const [movieGenres, setMovieGenres] = useState([])

  const getVideo = async () => {
    setLoading(true)
    if (movie.media_type === 'movie') {
      const res = await axios.get(
        `${process.env.REACT_APP_TMDB_BASE_URL}/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      setLoading(false)
      if (res.data.results.length > 0) {
        setKey(res.data.results[0].key)
      }
    } else {
      const res = await axios.get(
        `${process.env.REACT_APP_TMDB_BASE_URL}/tv/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      setLoading(false)
      if (res.data.results.length > 0) {
        setKey(res.data.results[0].key)
      }
    }
  }

  const getGenres = () => {
    if (movie.genre_ids.length > 0) {
      const allGenres = genres.filter(genre =>
        movie.genre_ids.includes(genre.id)
      )
      setMovieGenres(allGenres.splice(0, 3))
    }
  }
  useEffect(() => {
    getVideo()
    getGenres()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    { hover } && (
      <Box style={styles.container}>
        <ReactPlayer
          url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${key}`}
          style={styles.video}
          onBuffer={() => setLoading(true)}
          onBufferEnd={() => setLoading(false)}
          controls={false}
          playing={!loading}
          stopOnUnmount
          muted={muted}
        />
        <Box
          style={{
            minWidth: '100vw',
            minHeight: '100vh',
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
        <FontAwesomeIcon
          icon={muted ? faVolumeMute : faVolumeUp}
          style={styles.muteButton}
          onClick={() => setMuted(!muted)}
        />
        <Box style={styles.bottomContainer} />
        <Box style={styles.title}>{movie.title || movie.name}</Box>
        <Box style={styles.buttonsContainer}>
          <FontAwesomeIcon
            icon={faPlayCircle}
            style={{
              color: 'white',
              fontSize: '28px',
              backgroundColor: 'black',
              borderRadius: '50%'
            }}
          />
          <Box style={styles.plusButton} variant={'outline'}>
            +
          </Box>
          <FontAwesomeIcon icon={faThumbsUp} style={styles.button} />
          <FontAwesomeIcon icon={faThumbsDown} style={styles.button} />
        </Box>
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{
            fontSize: '28px',
            color: 'white',
            fontWeight: 'lighter',
            border: '2px solid grey',
            borderRadius: '50%',
            position: 'absolute',
            bottom: '30%',
            right: '10%',
            padding: '5px',
            width: '28px'
          }}
        />
        <Wrap style={styles.genres}>
          {movieGenres.map((genre, i) => (
            <Wrap key={genre.id} style={styles.genre}>
              {genre.name}
              {i !== movieGenres.length - 1 && (
                <Box
                  style={{
                    color: 'grey',
                    fontSize: '.75vw',
                    zIndex: 1,
                    padding: '0 5px'
                  }}
                >
                  •
                </Box>
              )}
            </Wrap>
          ))}
        </Wrap>
      </Box>
    )
  )
}

const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    minWidth: '250px',
    minHeight: '250px',
    zIndex: 100,
    overflow: 'hidden',
    backgroundColor: '#181818',
    borderRadius: '5px',
    elevation: 10,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    transition: 'all 0.5s ease-in-out'
  },
  bottomContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#181818',
    borderRadius: '4px'
  },

  video: {
    position: 'absolute',
    top: -45,
    left: -195,
    offset: '0 0',
    objectPosition: 'center',
    maxWidth: '100vw',
    maxHeight: '30vh',
    boxfit: 'fill',
    zIndex: 0
  },

  muteButton: {
    position: 'absolute',
    bottom: '50%',
    right: '10px',
    color: 'grey',
    fontSize: '1.3rem',
    width: '1.3rem',
    borderRadius: '50%',
    border: '1px solid grey',
    padding: '0.3rem',
    zIndex: 1
  },
  title: {
    position: 'absolute',
    bottom: '50%',
    left: '10%',
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    fontFamily: 'Netflix Sans Medium',
    width: 'auto',
    maxWidth: '70%',
    zIndex: 1,
    borderRadius: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '5px'
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: '30%',
    left: '10%',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1
  },
  button: {
    color: 'white',
    borderRadius: '50%',
    border: '2px solid grey',
    fontSize: '28px',
    zIndex: 1,
    padding: '5px',
    cursor: 'pointer'
  },
  plusButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '28px',
    color: 'white',
    border: '2px solid grey',
    width: '28px',
    height: '28px',
    padding: '0',
    paddingBottom: '5px',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  genres: {
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    color: 'white',
    fontSize: '.75vw',
    fontWeight: 'bold',
    fontFamily: 'Netflix Sans Medium',
    width: '100%',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}
export default VideoCard
