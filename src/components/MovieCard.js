import { Image, Box } from '@chakra-ui/react'
import React from 'react'

const MovieCard = ({ movie }) => {
  return (
    <Box style={styles.card}>
      <Image src={movie.poster_path} style={styles.image} />
    </Box>
  )
}

const styles = {
  card: {
    width: '15vw',
    height: '5vh'
  }
}

export default MovieCard