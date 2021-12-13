/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Box, Image } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const SimilarTitlesCard = ({ movie, media_type }) => {
  const [onList, setOnList] = useState(false)
  const [detailData, setDetailData] = useState([])
  const [duration, setDuration] = useState('')
  const [seasons, setSeasons] = useState(0)
  const [rating, setRating] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  const getRating = async () => {
    if (movie) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_TMDB_BASE_URL}/${media_type}/${movie.id}/${
            media_type === 'tv' ? 'content_ratings' : 'release_dates'
          }?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        )
        if (media_type === 'movie') {
          for (let idx = 0; idx < data.results.length; idx++) {
            const result = data.results[idx]
            for (let idx2 = 0; idx2 < result.release_dates.length; idx2++) {
              const release_date = result.release_dates[idx2]
              if (release_date.certification !== '') {
                setRating(`${release_date.certification}+`)
                break
              }
            }
          }
        } else {
          for (let idx = 0; idx < data.results.length; idx++) {
            const result = data.results[idx]
            if (result.rating !== '') {
              setRating(`${result.rating}+`)
              break
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getDetailData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/${media_type}/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-ES`
    )
    if (data.runtime) {
      let hours = Math.floor(data.runtime / 60)
      let minutes = data.runtime % 60
      setDuration(`${hours}h ${minutes}min`)
    }
    if (data.number_of_seasons) {
      setSeasons(data.number_of_seasons)
    }
    setDetailData(data)
  }

  useEffect(() => {
    getDetailData()
    getRating()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      style={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box style={styles.image}>
        <Image
          src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`}
          fallbackSrc={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
        />
        {isHovered && (
          <FontAwesomeIcon icon={faPlay} style={styles.playButton} />
        )}
        <Box style={styles.title}>{movie.title || movie.name}</Box>
        {media_type === 'tv' ? (
          <Box style={styles.duration}>
            {seasons > 1 ? `${seasons} Temporadas` : `${seasons} Temporada`}
          </Box>
        ) : (
          <Box style={styles.duration}>{duration}</Box>
        )}
      </Box>
      <Box style={styles.dataContainer}>
        <Box style={styles.dataLeft}>
          <Box style={styles.voteAverage}>
            {Math.floor(movie.vote_average * 10)}% para tí
          </Box>
          <Box display={'flex'} flexDirection={'row'}>
            <Box fontSize={'12px'} style={styles.rating}>
              {rating ? `${rating}` : 'TODOS'}
            </Box>
            <Box style={styles.year}>
              {movie.release_date
                ? movie.release_date.split('-')[0]
                : movie.first_air_date.split('-')[0]}
            </Box>
          </Box>
        </Box>

        <FontAwesomeIcon
          icon={onList ? faCheck : faPlus}
          style={styles.icon}
          onClick={() => setOnList(!onList)}
        />
      </Box>
      <Box className='modal-overview' style={styles.overview}>
        {movie.overview !== '' ? movie.overview : detailData.overview}
      </Box>
    </Box>
  )
}
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    backgroundColor: '#2F2F2F'
  },
  image: {
    position: 'relative',
    width: '100%',
    maxHeight: '10rem'
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px'
  },
  icon: {
    color: '#FFF',
    fontSize: '36px',
    cursor: 'pointer',
    padding: '0.5rem',
    border: '2px solid grey',
    borderRadius: '50%',
    width: '36px'
  },
  duration: {
    position: 'absolute',
    top: '5%',
    right: '5%',
    color: '#FFF',
    fontSize: '14px',
    fontFamily: 'Netflix Sans Black'
  },
  overview: {
    padding: '10px',
    width: '100%',
    color: 'rgb(210, 210, 210)',
    fontSize: '14px',
    fontWeight: '400',
    fontFamily: 'Netflix Sans Regular',
    maxHeight: '15rem',
    overflow: 'scroll'
  },
  title: {
    position: 'absolute',
    bottom: '15%',
    left: '5%',
    color: '#FFF',
    fontFamily: 'Netflix Sans Bold'
  },
  voteAverage: {
    color: 'rgb(70, 211, 105)',
    fontWeight: 'bold',
    lineHeight: '19.2px',
    fontFamily: 'Netflix Sans Medium',
    zIndex: 1,
    marginRight: '3px',
    fontSize: '16px',
    marginBottom: '5px'
  },
  rating: {
    color: 'white',
    fontWeight: '400',
    padding: '0 5px',
    fontFamily: 'Netflix Sans Thin',
    zIndex: 1,
    border: '1.5px solid grey',
    marginRight: '3px'
  },
  year: {
    color: 'white',
    fontSize: '16px',
    fontFamily: 'Netflix Sans Regular',
    marginLeft: '5px'
  },
  playButton: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: '50%',
    border: '1.5px solid #fff',
    position: 'absolute',
    top: '40%',
    left: '40%',
    padding: '10px',
    height: '46px',
    width: '46px',
    transition: 'all 0.3s ease-in-out'
  }
}

export default SimilarTitlesCard
