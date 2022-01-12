import { StrictMode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom'
import './index.scss'
import { NoteProvider } from 'contexts/noteContext'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AuthProvider } from './contexts/authContext'

ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <NoteProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </NoteProvider>
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
