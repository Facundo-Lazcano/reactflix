import React, { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import axios from 'axios'

const ModalShow = ({ movie, isOpen, onOpen, onClose, setHover }) => {
  const [videos, setVideos] = useState([])

  const getVideos = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/${movie.media_type}/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    setVideos(data.results)
    console.log(data.results)
  }

  useEffect(() => {
    getVideos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={styles.container}>
        <ModalCloseButton />
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  )
}

const styles = {
  container: {
    width: '80%%',
    minHeight: '100vh',
    backgroundColor: '#181818',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    elevation: '10'
  }
}

export default ModalShow
