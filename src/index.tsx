import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { NoteProvider } from 'contexts/noteContext'
import { CssBaseline, ThemeProvider } from '@mui/material'
import muiTheme from 'lib/muiTheme'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import { AuthProvider } from './contexts/authContext'

ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <NoteProvider>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </NoteProvider>
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
