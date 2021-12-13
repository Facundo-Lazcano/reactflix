import React, { useState, useEffect, useRef } from 'react'
import { Box, Image, Input } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons'
import useScrollPosition from '@react-hook/window-scroll'

const Header = ({ query, setQuery }) => {
  const searchRef = useRef(null)
  useEffect(() => {
    function handleClickOutside (event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchRef])

  const [search, setSearch] = useState(false)
  const scrollY = useScrollPosition(60 /*fps*/)
  const styles = {
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px 3rem',
      position: 'fixed',
      top: 0,
      zIndex: 4,
      width: '100%',
      backgroundColor: scrollY > 0 ? '#141414' : 'rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.5s ease-in-out'
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    icon: {
      color: '#fff',
      fontSize: '1.2rem',
      marginRight: '2rem',
      cursor: 'pointer'
    },

    searchContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'left',
      border: '1px solid #fff',
      backgroundColor: '#141414',
      marginRight: '2rem'
    },
    searchIcon: {
      color: '#fff',
      fontSize: '1.2rem',
      marginLeft: '.5rem',
      transition: 'all 0.5s ease-in-out'
    },
    leftContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'left'
    },
    leftButtons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      color: '#fff',
      width: '100%',
      marginLeft: '1rem'
    }
  }
  return (
    <Box style={styles.header}>
      <Box onClick={() => setQuery('')} style={styles.leftContainer}>
        <Image
          src='https://fontmeme.com/permalink/211213/8b65521e99415855bca15d5d4f10ad2c.png'
          h={45}
          cursor={'pointer'}
        />
        <Box style={styles.leftButtons}>
          <Box marginRight={4} cursor='pointer'>
            Inicio
          </Box>
          <Box marginRight={4} cursor='pointer'>
            Series
          </Box>
          <Box marginRight={4} cursor='pointer'>
            Peliculas
          </Box>
          <Box marginRight={4} cursor='pointer'>
            Novedades Populares
          </Box>
          <Box marginRight={4} cursor='pointer'>
            Mi lista
          </Box>
        </Box>
      </Box>

      <Box style={styles.buttons}>
        <Box ref={searchRef} style={search ? styles.searchContainer : null}>
          <FontAwesomeIcon
            icon={faSearch}
            style={!search ? styles.icon : styles.searchIcon}
            onClick={() => setSearch(!search)}
            on
          />
          {search && (
            <Input
              borderRadius='0'
              border='0'
              color='#fff'
              padding={0}
              height='auto'
              margin={0}
              paddingY={1}
              fontSize='14px'
              paddingRight='4rem'
              backgroundColor='#141414'
              type='text'
              placeholder='Títulos, personas, géneros'
              value={query}
              onChange={e => setQuery(e.target.value)}
              focusBorderColor='transparent'
              paddingLeft='.7rem'
            />
          )}
        </Box>
        <FontAwesomeIcon icon={faBell} style={styles.icon} />
        <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
      </Box>
    </Box>
  )
}

export default Header
