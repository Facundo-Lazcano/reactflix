import { Box } from '@chakra-ui/react'
import React from 'react'
import ImageCard from './ImageCard'
import VideoCard from './VideoCard'

const CardContainer = ({ movie, idx, trending }) => {
  const [hover, setHover] = React.useState(false)
  return (
    <Box
      style={trending ? styles.trendingImg : styles.imgBackdrop}
      onMouseEnter={() => setHover(true)}
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
    width: '100%'
  }
}

export default CardContainer
