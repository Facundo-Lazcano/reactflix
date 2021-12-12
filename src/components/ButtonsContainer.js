import { Box, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
  faPlayCircle,
  faCheck,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

const ButtonsContainer = ({ onList, setOnList, modal }) => {
  return (
    <Box style={modal ? styles.modalButtonsContainer : styles.buttonsContainer}>
      {modal ? (
        <Button leftIcon={<FontAwesomeIcon icon={faPlay} />}>Reproducir</Button>
      ) : (
        <FontAwesomeIcon
          icon={faPlayCircle}
          style={{
            color: 'white',
            fontSize: '28px',
            backgroundColor: 'black',
            borderRadius: '50%'
          }}
        />
      )}

      {!onList ? (
        <FontAwesomeIcon
          icon={faPlus}
          style={modal ? styles.modalPlusButton : styles.plusButton}
          onClick={() => setOnList(true)}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCheck}
          style={modal ? styles.modalPlusButton : styles.plusButton}
          onClick={() => setOnList(false)}
        />
      )}
      <FontAwesomeIcon
        icon={faThumbsUp}
        style={modal ? styles.modalButton : styles.button}
      />
      <FontAwesomeIcon
        icon={faThumbsDown}
        style={modal ? styles.modalButton : styles.button}
      />
    </Box>
  )
}
const styles = {
  buttonsContainer: {
    position: 'absolute',
    bottom: '30%',
    left: '10%',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1
  },
  modalButtonsContainer: {
    position: 'absolute',
    top: '55vh',
    left: '10%',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '33%'
  },
  button: {
    color: 'white',
    borderRadius: '50%',
    border: '1.5px solid grey',
    fontSize: '28px',
    zIndex: 1,
    padding: '5px',
    cursor: 'pointer'
  },
  modalButton: {
    color: 'white',
    borderRadius: '50%',
    border: '1.5px solid grey',
    fontSize: '36px',
    zIndex: 1,
    padding: '10px',
    cursor: 'pointer'
  },
  plusButton: {
    fontSize: '28px',
    color: 'grey',
    borderRadius: '50%',
    backgroundColor: '#141414',
    border: '1.5px solid grey',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    padding: '5px'
  },
  modalPlusButton: {
    fontSize: '36px',
    color: 'grey',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    border: '1.5px solid grey',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    padding: '5px'
  }
}

export default ButtonsContainer
