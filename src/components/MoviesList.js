import React, { useState } from 'react'
import { Box, Image } from '@chakra-ui/react'

const MoviesList = ({ movies, title }) => {
  const [listHover, setListHover] = useState(false)
  const [titleHover, setTitleHover] = useState(false)

  return (
    <Box
      style={styles.container}
      onMouseEnter={() => setListHover(true)}
      onMouseLeave={() => setListHover(false)}
    >
      <Box style={styles.top}>
        <Box
          style={styles.title}
          onMouseEnter={() => setTitleHover(true)}
          onMouseLeave={() => setTitleHover(false)}
          sx={{}}
        >
          <Box>{title}</Box>
          <Box style={styles.subtitle}>
            {listHover ? (titleHover ? ' Explorar Todos > ' : '>') : null}
          </Box>
        </Box>
        <Box>---------</Box>
      </Box>
      <Box style={styles.list}>
        {movies.map(movie => (
          <Box
            key={movie.id}
            cursor='pointer'
            p={4}
            borderRadius={4}
            padding={0}
            minWidth='20%'
          >
            <Image
              src={movie.poster_path}
              alt={movie.title}
              borderRadius={4}
              border='1px solid #eaeaea'
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1rem',
    border: '1px solid #eaeaea',
    width: '95vw'
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#F0FFFF'
  },

  title: {
    fontSize: '1.5rem',
    fontWeight: 'normal',
    color: '#F0FFFF',
    fontFamily: 'Netflix Sans Black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  subtitle: {
    fontSize: '1rem',
    marginLeft: '1rem',
    fontFamily: 'Netflix Sans Regular',
    fontWeight: 'bold'
  },
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marign: '1rem',
    justifyContent: 'space-between',
    overFlow: ''
  }
}
export default MoviesList
