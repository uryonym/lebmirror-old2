import { Button, Typography } from '@mui/material'
import { GoogleAuthProvider, signInWithRedirect, User, UserCredential } from 'firebase/auth'
import { fbAuth } from 'firebaseConfig'

const Login = () => {
  const clickSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const signInResult: UserCredential = await signInWithRedirect(fbAuth, provider)
    const currentUser: User = signInResult.user
    console.log(currentUser)
  }

  return (
    <div className="login">
      <Typography variant="h2">lebmirror</Typography>
      <Button variant="contained" onClick={clickSignIn}>
        サインイン
      </Button>
    </div>
  )
}

export default Login
