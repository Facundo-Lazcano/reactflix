import React, { useState, useEffect } from 'react'
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react'
import axios from 'axios'
import DataContainer from './DataContainer'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import ButtonsContainer from './ButtonsContainer'
import EpisodeList from './EpisodeList'

const ModalShow = ({
  movie,
  isOpen,
  onOpen,
  onClose,
  setHover,
  rating,
  duration,
  seasons,
  type,
  onList,
  setOnList,
  genres
}) => {
  const [videos, setVideos] = useState([])
  const [mute, setMute] = useState(true)
  const [cast, setCast] = useState([])
  const [detailData, setDetailData] = useState({})

  const getVideos = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/${movie.media_type}/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    setVideos(data.results)
  }

  const getCast = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/${movie.media_type}/${movie.id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    if (data.cast) {
      setCast(data.cast)
    }
  }

  const getDetailData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/${movie.media_type}/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    setDetailData(data)
  }

  useEffect(() => {
    getVideos()
    getCast()
    getDetailData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    videos.length > 0 && (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth={'70vw'} style={styles.container}>
          <ModalCloseButton zIndex={4} />
          <ModalBody>
            <Box style={styles.videoContainer}>
              <ReactPlayer
                url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${videos[0].key}`}
                playing={true}
                controls={false}
                style={styles.video}
                muted={mute}
              />
            </Box>
            <Box style={styles.blockVideo} />
            <Box style={styles.title}>{movie.title || movie.name}</Box>
            <ButtonsContainer
              modal={true}
              onList={onList}
              setOnList={setOnList}
            />
            <FontAwesomeIcon
              icon={mute ? faVolumeMute : faVolumeUp}
              style={styles.muteIcon}
              onClick={() => setMute(!mute)}
            />
          </ModalBody>
          <ModalFooter
            display={'flex'}
            flexDir={'column'}
            backgroundColor={'#181818'}
            marginTop={'70vh'}
          >
            <Box style={styles.movieData}>
              <Box style={styles.dataAndOverview}>
                <DataContainer
                  movie={movie}
                  rating={rating}
                  duration={duration}
                  seasons={seasons}
                  type={type}
                  modal={true}
                />
                <Box style={styles.overview}>{movie.overview}</Box>
              </Box>

              <Box style={styles.castAndGenre}>
                <Box className='cast-genre'>
                  <p color={'grey'}>
                    Elenco:{' '}
                    <span>
                      {cast
                        .slice(0, 8)
                        .map(actor => actor.name)
                        .join(', ')}
                    </span>
                  </p>
                </Box>
                <Box className='cast-genre'>
                  <p color={'grey'}>
                    Generos:
                    <span>
                      {' '}
                      {genres && genres.map(genre => genre.name).join(' • ')}
                    </span>
                  </p>
                </Box>
              </Box>
            </Box>
            {movie.media_type === 'tv' && (
              <Box style={styles.episodesContainer}>
                <EpisodeList tvShow={detailData} />
              </Box>
            )}

            <Box style={styles.relatedContent}>
              <Box style={styles.relatedTitle}>
                Más títulos similares a este:
              </Box>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  )
}

const styles = {
  container: {
    minWidth: '60%',
    minHeight: '70vh',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    elevation: '10',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px',
    borderWidth: 0,
    zIndex: '10',
    backgroundColor: 'rgb(18,18,18)'
  },
  videoContainer: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '130vw',
    height: '70vh',
    overflow: 'hidden',
    padding: '0px',
    margin: 0,
    zIndex: -2
  },
  video: {
    position: 'absolute',
    top: -50,
    left: -200,
    minWidth: '90vw',
    minHeight: '80vh',
    padding: '0px'
  },

  blockVideo: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: 'rgb(18,18,18)',
    background:
      'linear-gradient(180deg, rgba(18,18,18,0) 43vh, rgba(18,18,18,0.23573179271708689) 47vh, rgba(18,18,18,0.48783263305322133) 51vh, transparent 70vh)'
  },
  muteIcon: {
    position: 'absolute',
    top: '55vh',
    right: '10%',
    color: 'grey',
    cursor: 'pointer',
    fontSize: '36px',
    padding: '5px',
    borderRadius: '50%',
    border: '1.5px solid grey',
    zIndex: 2
  },
  title: {
    position: 'absolute',
    top: '40vh',
    left: '10%',
    color: 'white',
    fontSize: '36px',
    fontWeight: 'bold',
    padding: '5px',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: '5px',
    fontFamily: 'Netlix Sans Thin'
  },
  movieData: {
    color: 'white',
    display: 'flex',
    width: '90%',
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
    fontFamily: 'Netlix Sans Regular'
  },
  dataAndOverview: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  overview: {
    fontSize: '14px',
    fontWeight: '400',
    minWidth: '52%',
    marginTop: '10px',
    marginRight: '10px'
  },
  castAndGenre: {
    fontSize: '14px',
    fontWeight: '400',
    minWidth: '40%'
  },
  relatedContent: {
    minHeight: '50vh',
    marginTop: '120vh',
    backgroundColor: 'red',
    zIndex: 2,
    width: '100%'
  },
  episodesContainer: {
    zIndex: 2
  }
}
export default ModalShow
