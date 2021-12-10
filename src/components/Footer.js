import React from 'react'
import { Box, Button, Grid, Link } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <Box style={styles.footer}>
      <Box style={styles.socialLinks}>
        <FontAwesomeIcon icon={faFacebook} style={styles.socialIcon} />
        <FontAwesomeIcon icon={faInstagram} style={styles.socialIcon} />
        <FontAwesomeIcon icon={faTwitter} style={styles.socialIcon} />
        <FontAwesomeIcon icon={faYoutube} style={styles.socialIcon} />
      </Box>
      <Grid templateColumns={'repeat(4, 1fr)'} height={'126px'}>
        <Link style={styles.footerLink}>Audio y subtítulos</Link>
        <Link style={styles.footerLink}>Audio descriptivo</Link>
        <Link style={styles.footerLink}>Centro de ayuda</Link>
        <Link style={styles.footerLink}>Tarjetas de regalo</Link>
        <Link style={styles.footerLink}>Prensa</Link>
        <Link style={styles.footerLink}>Relaciones con inversionistas</Link>
        <Link style={styles.footerLink}>Empleo</Link>
        <Link style={styles.footerLink}>Términos de uso</Link>
        <Link style={styles.footerLink}>Privacidad</Link>
        <Link style={styles.footerLink}>Avisos legales</Link>
        <Link style={styles.footerLink}>Preferencias de cookies</Link>
        <Link style={styles.footerLink}>Información corporativa</Link>
        <Link style={styles.footerLink}>Contáctanos</Link>
      </Grid>
      <Button style={styles.codigoServicio}>Código de servicio</Button>
      <Box style={styles.copyright}>© 1997-2021 Netflix, Inc.</Box>
    </Box>
  )
}

const styles = {
  footer: {
    backgroundColor: '#141414',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',
    color: '#fff',
    width: '75%'
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '20%',
    marginBottom: '1rem'
  },
  socialIcon: {
    color: '#fff',
    fontSize: '1.5rem',
    margin: '0.5rem'
  },
  footerLink: {
    color: 'grey',
    fontSize: '13px',
    fontFamily: 'Netflix Sans Thin'
  },
  codigoServicio: {
    fontSize: '13px',
    fontFamily: 'Netflix Sans Thin',
    border: '1px solid grey',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    width: '130px',
    padding: '0.5em',
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'grey',
    backgroundColor: 'transparent',
    borderRadius: '0px'
  },
  copyright: {
    fontSize: '11px',
    fontFamily: 'Netflix Sans Thin',
    color: 'grey'
  }
}

export default Footer
