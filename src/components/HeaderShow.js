import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import ReactPlayer from 'react-player'

const HeaderShow = ({ show }) => {
  useEffect(() => {
    console.log(show)
  }, [show])

  return (
    <Box style={styles.container}>
      {show && (
        <Box>
          <ReactPlayer
            url={`${process.env.REACT_APP_VIDEO_BASE_URL}${show.key}`}
            playing={true}
            width='100%'
            height='100vh'
            controls={false}
            volume={0}
          />
          <Box>{show.title}</Box>
        </Box>
      )}
    </Box>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundColor: '#000'
  }
}

export default HeaderShow
