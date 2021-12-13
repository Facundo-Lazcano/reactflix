/* eslint-disable array-callback-return */
import React, { useEffect, useState, useRef } from 'react'
import EpisodeCard from './EspisodeCard'
import { Box, Button } from '@chakra-ui/react'
import axios from 'axios'
import { TriangleDownIcon } from '@chakra-ui/icons'

const EpisodeList = ({ tvShow }) => {
  const [selectedSeason, setSelectedSeason] = useState(1)
  const [episodes, setEpisodes] = useState([])
  const [selectOpen, setSelectOpen] = useState(false)
  const selectRef = useRef(null)

  const handleSeasonChange = e => {
    setSelectedSeason(e.currentTarget.textContent.split(' ')[1])
    setSelectOpen(false)
  }

  const renderSelectOpen = seasons => {
    if (selectOpen) {
      return seasons.map((season, idx) => {
        if (season.season_number === 0) return null
        if (season.episode_count === 0) return null
        return (
          <Box
            className='select-option'
            style={styles.seasonOption}
            onClick={handleSeasonChange}
          >
            <p ref={selectRef} key={idx}>
              Temporada {season.season_number}{' '}
              <span> ({season.episode_count} episodios)</span>
            </p>
          </Box>
        )
      })
    }
  }

  useEffect(() => {
    const getEpisodes = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_TMDB_BASE_URL}/tv/${tvShow.id}/season/${selectedSeason}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es-ES`
      )
      data.episodes.map(episode => {
        episode.runtime = Math.min(...tvShow.episode_run_time)
      })
      setEpisodes(data.episodes)
    }
    getEpisodes()
  }, [selectedSeason, tvShow.episode_run_time, tvShow.id])

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        <Box>Episodios</Box>
        <Button
          rightIcon={<TriangleDownIcon />}
          onClick={() => setSelectOpen(!selectOpen)}
          style={styles.season}
        >
          Temporada {selectedSeason}
        </Button>
        {selectOpen && (
          <Box style={styles.seasonsContainer}>
            {renderSelectOpen(tvShow.seasons)}
          </Box>
        )}
      </Box>
      <Box style={styles.content}>
        {episodes.length > 0 &&
          episodes.map(episode => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px',
    width: '100%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    color: '#fff',
    fontSize: '24px',
    fontFamily: 'Netflix Sans Black',
    position: 'relative',
    marginBottom: '10px'
  },
  season: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#242424',
    border: '1.5px solid grey',
    borderRadius: '5px',
    padding: '5px 30px'
  },
  seasonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: '105%',
    right: '0',
    border: '1.5px solid grey',
    backgroundColor: '#242424',
    padding: '5px 0'
  },
  seasonOption: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
    padding: '5px 15px',
    cursor: 'pointer'
  }
}

export default EpisodeList
