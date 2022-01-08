/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState, FC, useEffect } from 'react'
import { User } from 'firebase/auth'
import { getFirebaseAuth } from 'firebaseConfig'

type AuthContextProps = {
  user: User | null
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
})

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getFirebaseAuth()
    const unsubscribe = auth.onAuthStateChanged((fbUser) => {
      setUser(fbUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
