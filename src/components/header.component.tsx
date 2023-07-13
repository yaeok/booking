'use client'
import NextLink from 'next/link'

import { Box, Flex, Heading, HStack } from '@/common/design'

export default function Header() {
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

          <HStack spacing='4'></HStack>
        </Flex>
      </Flex>
    </Box>
  )
}
