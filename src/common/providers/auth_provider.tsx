'use client'

import { onAuthStateChanged } from 'firebase/auth'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { messageState } from '@/common/states/message.state'
import { userState } from '@/common/states/user.state'
import Loading from '@/components/loading.component'
import { auth } from '@/lib/firebase/config'

export const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useRecoilState(userState)
  const [loading, setLoading] = useState(true)
  const setMessage = useSetRecoilState(messageState)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMessage(true)
        setUser({
          userId: user.uid,
          username: user.displayName ?? '名前未設定',
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
