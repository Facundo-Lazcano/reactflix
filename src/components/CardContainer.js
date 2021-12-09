import React, { useState, useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import ImageCard from './ImageCard'
import VideoCard from './VideoCard'

const CardContainer = ({ movie, idx, trending }) => {
  const [hover, setHover] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    function handleClickOutside (event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setHover(false)
      }
    }

    document.addEventListener('mouseleave', handleClickOutside)
    return () => {
      document.removeEventListener('mouseleave', handleClickOutside)
    }
  }, [cardRef])
  return (
    <Box
      style={trending ? styles.trendingImg : styles.imgBackdrop}
      onMouseEnter={() => setTimeout(() => setHover(true), 300)}
      onMouseLeave={() => setHover(false)}
    >
      {!hover ? (
        <ImageCard movie={movie} idx={idx} trending={trending} />
      ) : (
        <VideoCard movie={movie} idx={idx} />
      )}
    </Box>
  )
}

const styles = {
  trendingImg: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    width: '100%',
    height: '15vw',
    overflow: 'hidden'
  },
  imgBackdrop: {
    borderRadius: '4px',
    height: '140px',
    overflow: 'hidden',
    width: '100%',
    margin: 0
  }
}

export default CardContainer
