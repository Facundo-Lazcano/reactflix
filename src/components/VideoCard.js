import { Box, Wrap } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faPlayCircle,
  faVolumeMute,
  faVolumeUp,
  faCheck,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

const VideoCard = ({ movie, hover }) => {
  const [loading, setLoading] = useState(false)
  const [muted, setMuted] = useState(true)
  const [key, setKey] = useState('')
  const [movieGenres, setMovieGenres] = useState([])
  const [onList, setOnList] = useState(false)
  const [rating, setRating] = useState('')
  const [seasons, setSeasons] = useState(0)
  const [type, setType] = useState('')
  const [duration, setDuration] = useState('')

  const getVideo = async () => {
    setLoading(true)
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/${movie.media_type}/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    )
    setLoading(false)
    if (data.results.length > 0) {
      setKey(data.results[0].key)
    }
  }

  const getRating = async () => {
    if (movie) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_TMDB_BASE_URL}/${movie.media_type}/${movie.id}/content_ratings?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-ES`
        )
        setRating(data.results[0].rating)
        console.log(data.results)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getDetails = async () => {
    if (movie) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_TMDB_BASE_URL}/${movie.media_type}/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-ES`
        )
        if (data.genres) {
          setMovieGenres(data.genres)
        }
        if (data.number_of_seasons) {
          setSeasons(data.number_of_seasons)
        }
        if (data.type) {
          setType(data.type)
        }
        if (data.runtime) {
          let hours = Math.floor(data.runtime / 60)
          let minutes = data.runtime % 60
          setDuration(`${hours}h ${minutes}min`)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getVideo()
    getRating()
    getDetails()
    console.log(movie)
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
          {!onList ? (
            <FontAwesomeIcon
              icon={faPlus}
              style={styles.plusButton}
              className='card-button'
              onClick={() => setOnList(true)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCheck}
              style={styles.plusButton}
              className='card-button'
              onClick={() => setOnList(false)}
            />
          )}
          <FontAwesomeIcon
            className='card-button'
            icon={faThumbsUp}
            style={styles.button}
          />
          <FontAwesomeIcon
            className='card-button'
            icon={faThumbsDown}
            style={styles.button}
          />
        </Box>
        <FontAwesomeIcon
          className='card-button'
          icon={faChevronDown}
          style={{
            fontSize: '28px',
            color: 'white',
            fontWeight: 'lighter',
            border: '1.5px solid grey',
            borderRadius: '50%',
            position: 'absolute',
            bottom: '30%',
            right: '10%',
            padding: '5px',
            width: '28px'
          }}
        />
        <Box style={styles.dataContainer}>
          <Box style={styles.voteAverage}>
            {movie.vote_average * 10}% para tí{' '}
          </Box>
          <Box style={styles.rating}>{rating ? `${rating}+` : 'TODOS'}</Box>
          {movie.media_type === 'tv' ? (
            <Box style={styles.duration}>
              {type === 'Miniseries'
                ? type
                : seasons > 1
                ? `${seasons} Temporadas`
                : `${seasons} Temporada`}
            </Box>
          ) : (
            <Box style={styles.duration}>{duration}</Box>
          )}
          <Box style={styles.hd}>HD</Box>
        </Box>
        <Wrap style={styles.genres}>
          {movieGenres.map((genre, i) => (
            <Wrap key={genre.id} style={styles.genre}>
              <Box>{genre.name}</Box>
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
    border: '1.5px solid grey',
    fontSize: '28px',
    zIndex: 1,
    padding: '5px',
    cursor: 'pointer'
  },
  plusButton: {
    fontSize: '28px',
    color: 'grey',
    borderRadius: '50%',
    backgroundColor: '#141414',
    border: '1.5px solid grey',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    padding: '5px'
  },
  dataContainer: {
    position: 'absolute',
    bottom: '15%',
    width: '90%',
    left: '6%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    zIndex: 1,
    alignItems: 'center'
  },
  voteAverage: {
    color: 'rgb(70, 211, 105)',
    fontSize: '10px',
    fontWeight: 'bold',
    lineHeight: '19.2px',
    fontFamily: 'Netflix Sans Medium',
    zIndex: 1,
    marginRight: '3px'
  },
  rating: {
    color: 'white',
    fontSize: '7px',
    fontWeight: '400',
    padding: '0 5px',
    fontFamily: 'Netflix Sans Thin',
    zIndex: 1,
    border: '1.5px solid grey',
    marginRight: '3px'
  },
  duration: {
    color: 'white',
    fontSize: '10px',
    fontWeight: '400',
    lineHeight: '19.2px',
    fontFamily: 'Netflix Sans Thin',
    zIndex: 1,
    marginRight: '3px'
  },
  hd: {
    fontSize: '8px',
    fontWeight: '400',
    fontFamily: 'Netflix Sans Thin',
    color: 'rgba(255, 255, 255, 0.9)',
    border: '1.5px solid grey',
    padding: '0 4px',
    borderRadius: '5px'
  },
  genres: {
    position: 'absolute',
    bottom: '5%',
    left: '8%',
    color: 'white',
    fontSize: '.60vw',
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
