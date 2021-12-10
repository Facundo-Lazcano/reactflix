import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import { renderNumber } from '../utils/RenderNumber'

const ImageCard = ({ movie, trending, idx }) => {
  return (
    <Box style={trending ? styles.trendingImg : styles.imgBackdrop}>
      {trending && renderNumber(idx + 1)}
      <Image
        src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/${
          trending ? movie.poster_path : movie.backdrop_path
        }`}
        fallbackSrc={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/${movie.poster_path}`}
        alt={movie.title}
        style={trending ? styles.trendingImg : styles.imgBackdrop}
      />
    </Box>
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
    height: '15vw'
  },
  imgBackdrop: {
    borderRadius: '4px',
    height: '140px',
    width: '100%',
    objectPosition: 'top'
  }
}

export default ImageCard
