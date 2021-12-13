import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import SimilarTitlesCard from './SimilarTitlesCard'

const SimilarTitlesList = ({ movies, media_type }) => {
  return (
    <Box>
      <Box style={styles.title}>Más títulos similares a este</Box>
      <Grid templateColumns={'repeat(3, 1fr)'} gap={5}>
        {movies.length > 0 &&
          movies.map(movie => (
            <SimilarTitlesCard movie={movie} media_type={media_type} />
          ))}
      </Grid>
    </Box>
  )
}

const styles = {
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'Netflix Sans Black',
    color: '#fff',
    marginBottom: '10px',
    textAlign: 'left',
    marginTop: '20px'
  }
}

export default SimilarTitlesList
