import React from 'react'
import { Box } from '@chakra-ui/react'
import MoviesList from '../components/MoviesList'

const HomePage = () => {
  const movies = [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      poster_path:
        'https://phantom-expansion.unidadeditorial.es/a9e8d1207c2e1ece71f66e2c0b591ca8/crop/0x23/1597x1085/resize/414/f/jpg/assets/multimedia/imagenes/2021/03/13/16156301244649.jpg'
    },
    {
      id: 2,
      title: 'The Shawshank Redemption',
      poster_path:
        'https://phantom-expansion.unidadeditorial.es/a9e8d1207c2e1ece71f66e2c0b591ca8/crop/0x23/1597x1085/resize/414/f/jpg/assets/multimedia/imagenes/2021/03/13/16156301244649.jpg'
    },
    {
      id: 3,
      title: 'The Shawshank Redemption',
      poster_path:
        'https://phantom-expansion.unidadeditorial.es/a9e8d1207c2e1ece71f66e2c0b591ca8/crop/0x23/1597x1085/resize/414/f/jpg/assets/multimedia/imagenes/2021/03/13/16156301244649.jpg'
    },
    {
      id: 4,
      title: 'The Shawshank Redemption',
      poster_path:
        'https://phantom-expansion.unidadeditorial.es/a9e8d1207c2e1ece71f66e2c0b591ca8/crop/0x23/1597x1085/resize/414/f/jpg/assets/multimedia/imagenes/2021/03/13/16156301244649.jpg'
    },
    {
      id: 5,
      title: 'The Shawshank Redemption',
      poster_path:
        'https://phantom-expansion.unidadeditorial.es/a9e8d1207c2e1ece71f66e2c0b591ca8/crop/0x23/1597x1085/resize/414/f/jpg/assets/multimedia/imagenes/2021/03/13/16156301244649.jpg'
    },
    {
      id: 6,
      title: 'The Shawshank Redemption',
      poster_path:
        'https://phantom-expansion.unidadeditorial.es/a9e8d1207c2e1ece71f66e2c0b591ca8/crop/0x23/1597x1085/resize/414/f/jpg/assets/multimedia/imagenes/2021/03/13/16156301244649.jpg'
    }
  ]
  return (
    <Box style={styles.container}>
      <MoviesList title='Mi lista' movies={movies} />
    </Box>
  )
}

const styles = {
  title: {
    fontSize: '2em',
    textAlign: 'center',
    marginTop: '1em'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flexWrap: 'wrap',
    flexGrowing: 1
  }
}
export default HomePage
