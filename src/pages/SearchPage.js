import React, { useState, useEffect } from 'react'
import { Box, Grid, Wrap, WrapItem } from '@chakra-ui/react'
import CardContainer from '../components/CardContainer'
import { relatedQuerys } from '../utils/relatedQuerys'

const SearchPage = ({ movies, query, setQuery }) => {
  const [related, setRelated] = useState([])
  const [selected, setSelected] = useState('')

  useEffect(() => {
    setRelated(relatedQuerys[query[0]])
  }, [query])

  return (
    <Box style={styles.container}>
      <Box style={styles.relatedTitles}>
        <Box style={styles.leftRelated}>Explora títulos relacionados con:</Box>
        <Wrap style={styles.rightRelated}>
          {related &&
            related.map(q => (
              <>
                <WrapItem style={styles.relatedText}>
                  <Box
                    sx={{ _hover: { color: '#DE0C14', cursor: 'pointer' } }}
                    onClick={() => {
                      setQuery(q)
                      setSelected(q)
                    }}
                  >
                    {q}
                  </Box>
                </WrapItem>
                <Box> | </Box>
              </>
            ))}
        </Wrap>
      </Box>
      {selected && (
        <Box style={styles.selectedTitle}>Títulos en: {selected}</Box>
      )}
      <Grid templateColumns='repeat(5, 1fr)' gap={1} style={styles.content}>
        {movies.map(movie => (
          <Box key={movie.id} style={styles.movie} className='swiper-slide'>
            <CardContainer movie={movie} />
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },

  movie: {
    width: '18vw',
    position: 'relative'
  },
  relatedTitles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'top',
    marginTop: '8rem',
    marginBottom: '2rem',
    width: '92.5%',
    height: 'auto'
  },
  leftRelated: {
    color: '#808080',
    fontSize: '16px',
    fontFamily: 'Netflix Sans Thin',
    fontWeight: 'bold',
    width: 'auto',
    marginRight: '1rem'
  },
  rightRelated: {
    justifyContent: 'left',
    marginTop: '3px',
    color: '#808080'
  },
  relatedText: {
    fontFamily: 'Netflix Sans Thin',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#fff',
    width: 'vw'
  },
  selectedTitle: {
    fontFamily: 'Netflix Sans Thin',
    fontWeight: 'bold',
    fontSize: '30px',
    color: '#fff',
    textAlign: 'left',
    width: '92.5%',
    marginBottom: '2rem'
  }
}

export default SearchPage
