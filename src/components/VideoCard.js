/* eslint-disable array-callback-return */
import { Box, useDisclosure, Wrap } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faVolumeMute,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons'
import ModalShow from './ModalShow'
import DataContainer from './DataContainer'
import ButtonsContainer from './ButtonsContainer'

const VideoCard = ({ movie, setHover }) => {
  const [loading, setLoading] = useState(false)
  const [muted, setMuted] = useState(true)
  const [key, setKey] = useState('')
  const [movieGenres, setMovieGenres] = useState([])
  const [onList, setOnList] = useState(false)
  const [rating, setRating] = useState('')
  const [seasons, setSeasons] = useState(0)
  const [type, setType] = useState('')
  const [duration, setDuration] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

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
          `${process.env.REACT_APP_TMDB_BASE_URL}/${movie.media_type}/${
            movie.id
          }/${
            movie.media_type === 'tv' ? 'content_ratings' : 'release_dates'
          }?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-ES`
        )
        data.results.map(result => {
          if (result.iso_3166_1 === 'BR') {
            if (movie.media_type === 'movie') {
              setRating(`${result.release_dates[0].certification}+`)
            } else {
              setRating(`${data.results[0].rating}+`)
            }
          }
        })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
      <ButtonsContainer onList={onList} setOnList={setOnList} />
      <FontAwesomeIcon
        icon={faChevronDown}
        onClick={() => {
          onOpen()
        }}
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
          width: '28px',
          zIndex: 100,
          cursor: 'pointer'
        }}
      />
      <DataContainer
        movie={movie}
        seasons={seasons}
        type={type}
        rating={rating}
        duration={duration}
      />
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
      <ModalShow
        isOpen={isOpen}
        onClose={onClose}
        movie={movie}
        setHover={setHover}
        rating={rating}
        duration={duration}
        genres={movieGenres}
        seasons={seasons}
        type={type}
        setOnList={setOnList}
        onList={onList}
      />
    </Box>
  )
}

const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    minWidth: '250px',
    minHeight: '250px',
    zIndex: 1,
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
    padding: '5px'
  },

  genres: {
    position: 'absolute',
    bottom: '5%',
    left: '8%',
    color: 'white',
    fontSize: '.60vw',
    fontWeight: 'bold',
    fontFamily: 'Netflix Sans Medium',
    width: '92%',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: '8%'
  }
}
export default VideoCard
