import {
  GoogleAuthProvider,
  signInWithRedirect,
  User,
  UserCredential,
} from 'firebase/auth'
import { fbAuth } from 'firebaseConfig'

const Login = () => {
  const clickSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const signInResult: UserCredential = await signInWithRedirect(
      fbAuth,
      provider
    )
    const currentUser: User = signInResult.user
    console.log(currentUser)
  }

  return (
    <div className="login">
      <h2>lebmirror</h2>
      <button type="button" onClick={clickSignIn}>
        サインイン
      </button>
    </div>
  )
}

export default Login
