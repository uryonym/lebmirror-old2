import { Button, Heading, VStack } from '@chakra-ui/react'
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
    <VStack>
      <Heading>lebmirror</Heading>
      <Button colorScheme="blue" size="sm" onClick={clickSignIn}>
        サインイン
      </Button>
    </VStack>
  )
}

export default Login
