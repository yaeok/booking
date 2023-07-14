'use client'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'

import { Button, Flex, Icon, Text, VStack } from '@/common/design'
import { signInFromGoogle } from '@/lib/firebase/apis/auth'

export default function SignInScreen() {
  const router = useRouter()
  const googleClick = async () => {
    await signInFromGoogle().then(() => {
      router.push('/week')
    })
  }

  return (
    <>
      <Flex height='100vh' justifyContent='center' padding='100px'>
        <VStack spacing='5'>
          <Text fontSize='3xl' fontWeight='bold' textAlign='center'>
            会議室予約管理システム
          </Text>
          <Button
            variant='outline'
            marginTop='4'
            colorScheme='gray'
            type='submit'
            paddingX='10'
            leftIcon={<Icon as={FcGoogle} />}
            onClick={() => googleClick()}
          >
            Googleでログインする
          </Button>
        </VStack>
      </Flex>
    </>
  )
}
