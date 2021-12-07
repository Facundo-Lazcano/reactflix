import React from 'react'
import { Image } from '@chakra-ui/react'
import { renderNumber } from '../utils/RenderNumber'

const ImageCard = ({ movie, trending, idx }) => {
  return (
    <>
      {trending && renderNumber(idx + 1)}
      <Image
        src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/${
          trending ? movie.poster_path : movie.backdrop_path
        }`}
        fallbackSrc={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/${movie.poster_path}`}
        alt={movie.title}
        objectFit='cover'
        style={trending ? styles.trendingImg : styles.imgBackdrop}
      />
    </>
  )
}
const styles = {
  trendingImg: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    width: '100%',
    height: '15vw',
    overflow: 'hidden'
  },
  imgBackdrop: {
    borderRadius: '4px',
    height: '140px',
    overflow: 'hidden',
    width: '100%',
    objectPosition: 'top'
  },
  name: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    color: '#fff',
    fontSize: '1.5rem',
    fontFamily: 'Netflix Sans Light',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
}

export default ImageCard
