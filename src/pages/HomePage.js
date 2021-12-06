import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import MoviesList from '../components/MoviesList'
import axios from 'axios'
import HeaderShow from '../components/HeaderShow'

const HomePage = () => {
  const [trends, setTrends] = useState([])
  const [popularTv, setPopularTv] = useState([])
  const [headerShow, setHeaderShow] = useState()

  const getHeaderShow = async () => {
    if (trends.length > 0) {
      const res = await axios.get(
        `${process.env.REACT_APP_TMBD_BASE_URL}/tv/${trends[0].id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      setHeaderShow(res.data.results[0])
    }
  }

  const getTrends = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_TMBD_BASE_URL}/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&limit=10`
    )
    setTrends(res.data.results.slice(0, 10))
  }
  const getPopularTvShows = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_TMBD_BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    setPopularTv(res.data.results)
  }
  useEffect(() => {
    getTrends()
    getPopularTvShows()
    getHeaderShow()
  }, [])
  return (
    <Box style={styles.container}>
      <HeaderShow show={headerShow} />
      <MoviesList title='Trending' movies={trends} trending />
      <MoviesList title='Popular Tv Shows' movies={popularTv} />
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
