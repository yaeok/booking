'use client'

import { Box, Container, Flex, Text } from '@/common/design'

export default function Footer() {
  return (
    <Box bg='gray.50' color='gray.700' as='footer'>
      <Container maxW='5xl' py={4}>
        <Flex justify='space-between' align='center'>
          <Text as='small'>© 2023 revolveok</Text>
        </Flex>
      </Container>
    </Box>
  )
}
