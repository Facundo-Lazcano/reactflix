/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import MoviesList from '../components/MoviesList'
import axios from 'axios'
import HeaderShow from '../components/HeaderVideo'
import { genres } from '../utils/Genres'

const HomePage = () => {
  const [trends, setTrends] = useState([])
  const [popularTv, setPopularTv] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedTv, setTopRatedTv] = useState([])
  const [headerShow, setHeaderShow] = useState()
  const [randomGenre, setRandomGenre] = useState()
  const [randomGenre2, setRandomGenre2] = useState()

  const getRandomGenre = async () => {
    const random = await Math.floor(Math.random() * genres.length)
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/discover/movie`,
      {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          language: 'es-ES',
          with_genres: genres[random].id
        }
      }
    )
    genres.filter(genre => genre.id !== genres[random].id)
    data.results.map(movie => {
      movie.media_type = 'movie'
    })
    setRandomGenre({ name: genres[random].name, movies: data.results })
  }

  const getRandomGenre2 = async () => {
    const random = await Math.floor(Math.random() * genres.length)
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/discover/movie`,
      {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          language: 'es-ES',
          with_genres: genres[random].id
        }
      }
    )
    genres.filter(genre => genre.id !== genres[random].id)
    data.results.map(movie => {
      movie.media_type = 'movie'
    })
    setRandomGenre2({ name: genres[random].name, movies: data.results })
  }

  const getTrends = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-ES`
    )
    await setTrends(res.data.results.slice(0, 10))

    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/tv/${res.data.results[0].id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    setHeaderShow(response.data.results[0])
  }
  const getPopularTvShows = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-ES`
    )
    data.results.map(movie => {
      movie.media_type = 'tv'
    })
    setPopularTv(data.results)
  }

  const getPopularMovies = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-ES`
    )
    data.results.map(movie => {
      movie.media_type = 'movie'
    })
    setPopularMovies(data.results)
  }

  const getTopRatedTv = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-ES`
    )
    data.results.map(movie => {
      movie.media_type = 'tv'
    })
    setTopRatedTv(data.results)
  }

  useEffect(() => {
    getTrends()
    getPopularTvShows()
    getPopularMovies()
    getTopRatedTv()
    getRandomGenre()
    getRandomGenre2()
  }, [])

  return (
    <Box style={styles.container}>
      <HeaderShow showVideo={headerShow} show={trends[0]} />

      <MoviesList title='Popular Tv Shows' movies={popularTv} />
      <MoviesList title='Trending' movies={trends} trending />
      <MoviesList title='Popular movies' movies={popularMovies} />
      <MoviesList title='Top rated Tv Shows' movies={topRatedTv} />
      {randomGenre && randomGenre2 && (
        <Box>
          <MoviesList title={randomGenre.name} movies={randomGenre.movies} />
          <MoviesList title={randomGenre2.name} movies={randomGenre2.movies} />
        </Box>
      )}
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
