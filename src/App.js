import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import HomePage from './pages/HomePage'
import { Box } from '@chakra-ui/react'

function App () {
  return (
    <ChakraProvider>
      <Box style={styles.container}>
        <HomePage />
      </Box>
    </ChakraProvider>
  )
}

const styles = {
  container: {
    backgroundColor: '#141414',
    minHeight: '100vh'
  }
}

export default App
