import React, { useState } from 'react'
import { Box, Image } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import '../index.css'
import 'swiper/swiper.min.css' // core Swiper
import 'swiper/modules/navigation/navigation.min.css' // Navigation module
import 'swiper/modules/pagination/pagination.min.css' // Pagination module
import {
  Svg1,
  Svg2,
  Svg3,
  Svg4,
  Svg5,
  Svg6,
  Svg7,
  Svg8,
  Svg9,
  Svg10
} from './svg/Numbers'

SwiperCore.use([Navigation, Pagination])

const MoviesList = ({ movies, title, trending }) => {
  const [listHover, setListHover] = useState(false)
  const [titleHover, setTitleHover] = useState(false)
  const [swiperHover, setSwiperHover] = useState(false)

  const renderNumber = number => {
    switch (number) {
      case 1:
        return <Svg1 />

      case 2:
        return <Svg2 />

      case 3:
        return <Svg3 />

      case 4:
        return <Svg4 />

      case 5:
        return <Svg5 />

      case 6:
        return <Svg6 />

      case 7:
        return <Svg7 />

      case 8:
        return <Svg8 />

      case 9:
        return <Svg9 />

      case 10:
        return <Svg10 />

      default:
        return <Svg1 />
    }
  }

  return (
    <Box
      style={styles.container}
      onMouseEnter={() => setListHover(true)}
      onMouseLeave={() => setListHover(false)}
    >
      <Box style={styles.top}>
        <Box
          style={styles.title}
          onMouseEnter={() => setTitleHover(true)}
          onMouseLeave={() => setTitleHover(false)}
          sx={{}}
        >
          <Box>{title}</Box>
          <Box style={styles.subtitle}>
            {listHover ? (titleHover ? ' Explorar Todos > ' : '>') : null}
          </Box>
        </Box>
      </Box>
      <Box
        onMouseEnter={() => setSwiperHover(true)}
        onMouseLeave={() => setSwiperHover(false)}
      >
        <Swiper
          slidesPerView={5}
          slidesPerGroup={5}
          spaceBetween={10}
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
          navigation={true}
          pagination={
            swiperHover
              ? {
                  clickable: false,
                  renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + '</span>'
                  }
                }
              : false
          }
          style={styles.swiper}
          loop={true}
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={movie.id} cursor='pointer'>
              {trending ? (
                <Box style={styles.slide}>
                  {trending ? renderNumber(idx + 1) : null}
                  <Image
                    src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/${movie.poster_path}`}
                    alt={movie.title}
                    style={styles.img}
                  />
                </Box>
              ) : (
                <Box style={styles.slide}>
                  <Image
                    src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/${movie.backdrop_path}`}
                    alt={movie.title}
                    style={trending ? styles.img : styles.imgBackdrop}
                  />
                </Box>
              )}
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
    width: '95vw',
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
    alignItems: 'center'
  },
  subtitle: {
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
  img: {
    borderRadius: '4px',
    height: '15vw'
  },
  imgBackdrop: {
    borderRadius: '4px',
    height: '140px'
  },
  slide: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
export default MoviesList
