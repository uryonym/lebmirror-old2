/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState, FC, useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { fbAuth } from 'firebaseConfig'

type AuthContextProps = {
  user: User | null
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
})

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(
    () =>
      onAuthStateChanged(fbAuth, (fbUser) => {
        setUser(fbUser)
        setLoading(false)
      }),
    []
  )

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
