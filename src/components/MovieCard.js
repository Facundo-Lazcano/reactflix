import { Image } from '@chakra-ui/react'
import React from 'react'

const MovieCard = ({ movie, trending }) => {
  return (
    <Image
      src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/${
        trending ? movie.poster_path : movie.backdrop_path
      }`}
      fallbackSrc={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/${movie.poster_path}`}
      alt={movie.title}
      style={trending ? styles.img : styles.imgBackdrop}
    />
  )
}

const styles = {
  img: {
    borderRadius: '4px',
    height: '15vw'
  },
  imgBackdrop: {
    borderRadius: '4px',
    height: '140px'
  }
}

export default MovieCard
