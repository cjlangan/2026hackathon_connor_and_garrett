import './App.css'
import { Box, Button, Container, Typography } from '@mui/material'

function App() {

  return (
    <>
    <Container>
        {/* header */}
        <Box sx={{padding: 4, display: 'flex', justifyContent: 'center'}}>
          <Typography variant='h1' >
            BusyBox
          </Typography>
        </Box>
        {/* main */}
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
          <img style={{borderRadius: 10}} src="/tv.avif"/>
          <Box sx={{display: 'flex', flexDirection:'column', margin: 3}}>
            <Typography variant='h3'>About Us</Typography>
            <Typography variant='body1'>BusyBox aims to solve all of your business needs. We have the ability to deploy a wide network of customized devices along with trained techinicians to eliminate the stress of managing your technology.</Typography>
          </Box>
          <Box sx={{display: 'flex', flexDirection:'column', margin: 3}}>
            <Typography variant='h3'>Our Mission</Typography>
            <Typography variant='body1'>BusyBox was founded in March 2026 by students participating in the Taiv Hackathon, in a very limited amount of time. We saw an opportunity to help local business in our area of expertise.</Typography>
          </Box>
          <Box sx={{display: 'flex', flexDirection:'column', margin: 3}}>
            <Typography variant='h3'>Contact</Typography>
            <Typography variant='body1'>Phone: (204) 123-4567</Typography>
            <Typography variant='body1'>Email: busy@box.ca</Typography>
            <Typography variant='body1'>Phone: 123 Main St. Winnipeg, MB, R0A 1A8, Canada</Typography>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Button>Contact Us</Button>
            </Box>
          </Box>
        </Box>
        </Container>
    </>
  )
}

export default App
