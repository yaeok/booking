'use client'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useRecoilValue } from 'recoil'

import { useToast } from '@/common/design'
import { messageState } from '@/common/states/message.state'
import { userState } from '@/common/states/user.state'
import Loading from '@/components/loading.component'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const user = useRecoilValue(userState)
  const message = useRecoilValue(messageState)
  const router = useRouter()
  const toast = useToast()

  if (typeof user === 'undefined') {
    return <Loading />
  }

  if (user === null) {
    router.replace('/login')
    if (!message) {
      toast({
        title: 'ログインしてください',
        status: 'error',
        isClosable: true,
      })
    }
    return null
  }

  return <>{children}</>
}
