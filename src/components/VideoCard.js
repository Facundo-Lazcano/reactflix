import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

const VideoCard = ({ movie }) => {
  const [loading, setLoading] = useState(false)
  const [muted, setMuted] = useState(true)
  const [key, setKey] = useState('')

  const getVideo = async () => {
    setLoading(true)
    if (movie.media_type === 'movie') {
      const res = await axios.get(
        `${process.env.REACT_APP_TMDB_BASE_URL}/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      setLoading(false)
      if (res.data.results.length > 0) {
        setKey(res.data.results[0].key)
      }
    } else {
      const res = await axios.get(
        `${process.env.REACT_APP_TMDB_BASE_URL}/tv/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      setLoading(false)
      if (res.data.results.length > 0) {
        setKey(res.data.results[0].key)
      }
    }
  }
  useEffect(() => {
    getVideo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box style={styles.container}>
      <ReactPlayer
        url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${key}`}
        style={{
          position: 'absolute',
          top: -110,
          maxWidth: '20vw',
          maxHeight: '40vw',
          boxfit: 'fill'
        }}
        onBuffer={() => setLoading(true)}
        onBufferEnd={() => setLoading(false)}
        controls={false}
        playing={!loading}
        muted={muted}
      />
      <FontAwesomeIcon
        icon={muted ? faVolumeMute : faVolumeUp}
        style={styles.muteButton}
        onClick={() => setMuted(!muted)}
      />

      <Box style={styles.bottomContainer} />
      <Box style={styles.title}>{movie.title || movie.name}</Box>
    </Box>
  )
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  bottomContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#181818',
    borderRadius: '4px'
  },

  muteButton: {
    position: 'absolute',
    bottom: '60px',
    right: '10px',
    color: 'white',
    fontSize: '1.5rem',
    borderRadius: '50%',
    border: '1px solid white',
    padding: '0.3rem'
  },
  title: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    fontFamily: 'Netflix Sans Medium',
    width: '80%'
  }
}
export default VideoCard
