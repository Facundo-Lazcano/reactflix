import React, { useState } from 'react'
import { Box, Image } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const EpisodeCard = ({ episode }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Box
      style={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      zIndex={5}
      backgroundColor={episode.episode_number === 1 && '#333333'}
    >
      <Box style={styles.number}>{episode.episode_number}</Box>
      <Box style={styles.image}>
        <Image
          borderRadius={5}
          src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/${episode.still_path}`}
        />
        {isHovered && (
          <FontAwesomeIcon icon={faPlay} style={styles.playButton} />
        )}
      </Box>
      <Box style={styles.RightSide}>
        <Box style={styles.titleAndDuration}>
          <Box style={styles.title}>{episode.name}</Box>
          <Box style={styles.duration}>{episode.runtime} min</Box>
        </Box>
        <Box style={styles.description}>{episode.overview}</Box>
      </Box>
    </Box>
  )
}
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '3rem',
    color: '#fff',
    fontFamily: 'Nerflix Sans Regular',
    fontSize: '14px',
    fontWeight: 'normal',
    borderBottom: '1.5px solid grey',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  number: {
    fontSize: '24px',
    marginRight: '1rem'
  },
  image: {
    width: '28%',
    position: 'relative'
  },
  RightSide: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    marginLeft: '1rem'
  },
  titleAndDuration: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold'
  },
  duration: {
    fontSize: '16px'
  },
  description: {
    color: 'rgb(210,210,210)',
    width: '100%'
  },
  playButton: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: '50%',
    border: '1.5px solid #fff',
    position: 'absolute',
    top: '15',
    left: '40',
    padding: '10px',
    height: '46px',
    width: '46px',
    transition: 'all 0.3s ease-in-out'
  }
}

export default EpisodeCard
