import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'


const theme = createTheme({
  typography: {
    fontFamily: [
      'Iosevka Charon Mono',
    ].join(','),
    h1: {
      fontSize: '4rem',
      fontWeight: 800,
    },
    body1: {
      color: "white"
    }
  },
  
})


createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
)
