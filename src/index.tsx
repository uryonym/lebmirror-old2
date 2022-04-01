import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { CssBaseline, ThemeProvider } from '@mui/material'
import muiTheme from 'lib/muiTheme'
import { Provider } from 'react-redux'
import { AuthProvider } from 'contexts/authContext'
import { NoteProvider } from 'contexts/noteContext'
import { store } from 'app/store'
import reportWebVitals from './reportWebVitals'
import App from './components/App'

ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <NoteProvider>
        <Provider store={store}>
          <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Provider>
      </NoteProvider>
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
