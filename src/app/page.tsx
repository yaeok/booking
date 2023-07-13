'use client'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

import { DUMMY } from '@/common/constants/dummy'
import { TIME_DATA } from '@/common/constants/time_data'
import {
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@/common/design'
import { Booking } from '@/common/models/booking.model'
import { calculateTime } from '@/common/utils/calculate_time'
import Loading from '@/components/loading.component'

export default function HomeScreen() {
  const [dateList, setDateList] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [bookingList, setBookingList] = useState<Booking[]>(DUMMY)
  const [bookingData, setBookingData] = useState<
    { bookingdate: string; timeList: number[] }[]
  >([])
  useEffect(() => {
    if (dateList.length > 0) {
      return
    } else {
      const today = new Date()

      for (let i = 0; i < 5; i++) {
        const date = new Date()
        date.setDate(today.getDate() + i)
        console.log(date.toDateString())
        setDateList((prev) => [...prev, format(date, 'yyyy/MM/dd')])
      }

      for (let i = 0; i < bookingList.length; i++) {
        const timeList = calculateTime(
          bookingList[i].timeOfStart,
          bookingList[i].timeOfEnd
        )
        console.log(timeList)
        const date = bookingList[i].dateOfBooking
        setBookingData((prev) => [
          ...prev,
          { bookingdate: date, timeList: timeList },
        ])
      }
      console.log('test:' + bookingData)
      setLoading(false)
    }
  }, [])
  return loading ? (
    <Loading />
  ) : (
    <Flex flexDirection='column'>
      <Flex flexDirection='row' justifyContent='space-between'>
        <Heading size='md'>予約一覧</Heading>
        <Button>新規予約</Button>
      </Flex>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th></Th>
            {dateList.map((date, index) => (
              <Th key={index}>{date}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {TIME_DATA.map((time) => (
            <Tr key={time.id}>
              <Td fontSize='10' color='gray.500'>
                {time.label}
              </Td>
              {dateList.map((date, index) => (
                <Td
                  fontSize='12'
                  key={index}
                  cursor={true ? 'pointer' : 'not-allowed'}
                  onClick={() => console.log('押したよ')}
                >
                  {bookingData.find(
                    (booking) =>
                      booking.bookingdate === date &&
                      booking.timeList.includes(time.id)
                  )?.bookingdate != null ? (
                    <>予定あり</>
                  ) : (
                    <></>
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}
