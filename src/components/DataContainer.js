import { Box } from '@chakra-ui/react'
import React from 'react'

const DataContainer = ({ rating, movie, type, duration, seasons, modal }) => {
  return (
    <Box style={modal ? styles.modalContainer : styles.dataContainer}>
      <Box fontSize={modal ? '16px' : '10px'} style={styles.voteAverage}>
        {movie.vote_average * 10}% para tí
      </Box>
      <Box fontSize={modal ? '12px' : '7px'} style={styles.rating}>
        {rating ? `${rating}` : 'TODOS'}
      </Box>
      {movie.media_type === 'tv' ? (
        <Box fontSize={modal ? '16px' : '10px'} style={styles.duration}>
          {type === 'Miniseries'
            ? type
            : seasons > 1
            ? `${seasons} Temporadas`
            : `${seasons} Temporada`}
        </Box>
      ) : (
        <Box fontSize={modal ? '16px' : '10px'} style={styles.duration}>
          {duration}
        </Box>
      )}
      <Box
        lineHeight={modal && '12px'}
        fontSize={modal ? '11px' : '8px'}
        style={styles.hd}
      >
        HD
      </Box>
    </Box>
  )
}

const styles = {
  modalContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center'
  },
  dataContainer: {
    position: 'absolute',
    bottom: '15%',
    width: '90%',
    left: '6%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    zIndex: 1,
    alignItems: 'center'
  },
  voteAverage: {
    color: 'rgb(70, 211, 105)',
    fontWeight: 'bold',
    lineHeight: '19.2px',
    fontFamily: 'Netflix Sans Medium',
    zIndex: 1,
    marginRight: '3px'
  },
  rating: {
    color: 'white',
    fontWeight: '400',
    padding: '0 5px',
    fontFamily: 'Netflix Sans Thin',
    zIndex: 1,
    border: '1.5px solid grey',
    marginRight: '3px'
  },
  duration: {
    color: 'white',
    fontWeight: '400',
    lineHeight: '19.2px',
    fontFamily: 'Netflix Sans Thin',
    zIndex: 1,
    marginRight: '3px'
  },
  hd: {
    fontWeight: '400',
    fontFamily: 'Netflix Sans Thin',
    color: 'rgba(255, 255, 255, 0.9)',
    border: '1.5px solid grey',
    padding: '0 4px',
    borderRadius: '5px',
    zIndex: 1
  }
}

export default DataContainer
