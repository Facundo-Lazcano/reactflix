import React, { useState, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import ImageCard from './ImageCard'
import VideoCard from './VideoCard'

const CardContainer = ({ movie, idx, trending }) => {
  const [hover, setHover] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMovement = (boxX, boxY) => {
    const { x, y, width, height } = cardRef.current.getBoundingClientRect()
    if (x < boxX && boxX < x + width && y < boxY && boxY < y + height) {
      setHover(true)
    } else {
      setHover(false)
    }
  }

  return (
    <Box
      ref={cardRef}
      style={trending ? styles.trendingImg : styles.imgBackdrop}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={e => handleMouseMovement(e.clientX, e.clientY)}
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
    height: '15vw'
  },
  imgBackdrop: {
    borderRadius: '4px',
    height: '140px',
    width: '100%',
    margin: 0
  }
}

export default CardContainer
