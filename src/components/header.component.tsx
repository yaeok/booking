'use client'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'

import { Box, Button, Flex, Heading, HStack, useToast } from '@/common/design'
import { signOut } from '@/lib/firebase/apis/auth'

export default function Header() {
  const router = useRouter()
  const toast = useToast()
  const onClickLogout = () => {
    signOut().then(() => {
      router.push('/')
      toast({
        title: 'ログアウトしました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }
  return (
    <Box as='header' position={'sticky'} top={0} zIndex={'docked'}>
      <Flex
        bg='white'
        color='gray.600'
        minH='60px'
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle='solid'
        borderColor='gray.200'
        align='center'
      >
        <Flex flex={1} justify='space-between' maxW='5xl' mx='auto'>
          <Heading as='h1' size='lg'>
            <NextLink href='/'>会議室予約管理システム</NextLink>
          </Heading>

          <HStack spacing='4'>
            <Button
              color='white'
              bg='red.500'
              _hover={{ bg: 'red.600' }}
              onClick={() => onClickLogout()}
            >
              ログアウト
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  )
}
