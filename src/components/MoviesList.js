import React, { useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import '../index.css'
import 'swiper/swiper.min.css' // core Swiper
import 'swiper/modules/navigation/navigation.min.css' // Navigation module
import 'swiper/modules/pagination/pagination.min.css' // Pagination module
import CardContainer from './CardContainer'

SwiperCore.use([Navigation, Pagination])

const MoviesList = ({ movies, title, trending }) => {
  const [listHover, setListHover] = useState(false)
  const [swiperHover, setSwiperHover] = useState(false)
  return (
    <Box
      style={styles.container}
      onMouseEnter={() => setListHover(true)}
      onMouseLeave={() => setListHover(false)}
    >
      <Box style={styles.top}>
        <Box style={styles.title}>
          <Box>{title}</Box>
          <Box style={styles.subtitle}>
            <Text className='subtitle-hidden'>Explorar todos</Text>
            <Text>{listHover && '>'}</Text>
          </Box>
        </Box>
      </Box>
      <Box
        onMouseEnter={() => setSwiperHover(true)}
        onMouseLeave={() => setSwiperHover(false)}
      >
        <Swiper
          key={title}
          slidesPerView={5}
          slidesPerGroup={5}
          spaceBetween={10}
          navigation={swiperHover ? true : false}
          pagination={
            swiperHover
              ? {
                  clickable: false,

                  renderBullet: function (index, className) {
                    return '<span class="' + className + '"> </span>'
                  }
                }
              : false
          }
          style={styles.swiper}
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={movie.id} cursor='pointer'>
              <Box style={styles.slide}>
                <CardContainer movie={movie} trending={trending} idx={idx} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1rem',
    width: '94vw',
    marginBottom: '1rem'
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#F0FFFF',
    marginBottom: '.8rem'
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#F0FFFF',
    fontFamily: 'Netflix Sans Regular',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: '1'
  },
  subtitle: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '1rem',
    marginLeft: '1rem',
    fontFamily: 'Netflix Sans Regular',
    fontWeight: 'bold'
  },
  swiper: {
    width: '100%',
    height: '100%',
    overflow: 'visible'
  },
  slide: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  }
}
export default MoviesList
