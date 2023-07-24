'use client'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { DUMMY_BOOKING, DUMMY_ROOM } from '@/common/constants/dummy'
import { TIME_DATA } from '@/common/constants/time_data'
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@/common/design'
import { Booking } from '@/common/models/booking.type'
import { userState } from '@/common/states/user.state'
import { calculateTime } from '@/common/utils/calculate_time'
import { validateReservationForm } from '@/common/utils/validate'
import Loading from '@/components/loading.component'
import { registerBooking } from '@/lib/firebase/apis/booking'

export default function WeekScreen() {
  /** ユーザ情報 */
  const user = useRecoilValue(userState)
  /** modalとtoast通知 */
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  /** router */
  const router = useRouter()
  const [isBooking, setIsBooking] = useState<boolean>(false)
  const [dateList, setDateList] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [bookingList, setBookingList] = useState<Booking[]>(DUMMY_BOOKING)
  const [bookingData, setBookingData] = useState<
    { bookingdate: string; timeList: number[] }[]
  >([])

  /** 新規登録用のState */
  const [roomId, setRoomId] = useState<string>('0')
  const [dateOfBooking, setDateOfBooking] = useState<string>('')
  const [timeOfStart, setTimeOfStart] = useState<string>('')
  const [timeOfEnd, setTimeOfEnd] = useState<string>('')
  const [content, setContent] = useState<string>('')
  /** 新規登録用のState */
  useEffect(() => {
    if (dateList.length > 0) {
      return
    } else {
      const today = new Date()

      for (let i = 0; i < 5; i++) {
        const date = new Date()
        date.setDate(today.getDate() + i)
        setDateList((prev) => [...prev, format(date, 'yyyy/MM/dd')])
      }

      for (let i = 0; i < bookingList.length; i++) {
        const timeList = calculateTime(
          bookingList[i].timeOfStart,
          bookingList[i].timeOfEnd
        )
        const date = bookingList[i].dateOfBooking
        setBookingData((prev) => [
          ...prev,
          { bookingdate: date, timeList: timeList },
        ])
      }
      setLoading(false)
    }
  }, [])
  const onClickRegister = () => {
    const error: string = validateReservationForm({
      roomId: roomId,
      dateOfBooking: dateOfBooking,
      timeOfStart: timeOfStart,
      timeOfEnd: timeOfEnd,
      content: content,
    })

    if (error) {
      toast({
        title: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } else {
      registerBooking({
        roomId: roomId,
        userId: user!.userId,
        dateOfBooking: dateOfBooking,
        timeOfStart: timeOfStart,
        timeOfEnd: timeOfEnd,
        content: content,
      })
      console.log('登録完了')
    }
  }
  return loading ? (
    <Loading />
  ) : (
    <>
      <Flex flexDirection='column'>
        <TableContainer overflowX='unset' overflowY='unset'>
          <Table variant='simple'>
            <Thead position='sticky' top='60px' zIndex='docked' bg='white'>
              <Tr>
                <Th></Th>
                {dateList.map((date, index) => (
                  <Th key={index} textAlign='center'>
                    {date}
                  </Th>
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
                    <Td fontSize='12' key={index}>
                      {bookingData.find(
                        (booking) =>
                          booking.bookingdate === date &&
                          booking.timeList.includes(time.id)
                      )?.bookingdate != null ? (
                        <Button
                          variant='unstyled'
                          bg='gray.100'
                          fontSize='12px'
                          onClick={() => {
                            setIsBooking(true)
                            onOpen()
                          }}
                          width='100%'
                        >
                          予約有
                        </Button>
                      ) : (
                        <Button
                          variant='unstyled'
                          fontSize='12px'
                          onClick={() => {
                            setIsBooking(false)
                            onOpen()
                          }}
                          width='100%'
                        ></Button>
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        {isBooking ? (
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>予約内容</ModalHeader>
            <ModalBody paddingBottom='4'>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>予約日</Td>
                    <Td>2023-07-15</Td>
                  </Tr>
                  <Tr>
                    <Td>会議室</Td>
                    <Td>Aルーム</Td>
                  </Tr>
                  <Tr>
                    <Td>利用者</Td>
                    <Td>八重尾さん</Td>
                  </Tr>
                  <Tr>
                    <Td>開始時刻</Td>
                    <Td>PM 12:00</Td>
                  </Tr>
                  <Tr>
                    <Td>終了時刻</Td>
                    <Td>PM 13:00</Td>
                  </Tr>
                  <Tr>
                    <Td>会議内容</Td>
                    <Td>面談</Td>
                  </Tr>
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => onClose()}>閉じる</Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>新規登録</ModalHeader>
            <ModalBody paddingBottom='4'>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>予約日</Td>
                    <Td>
                      <Input
                        type='date'
                        onChange={(e) => setDateOfBooking(e.target.value)}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>会議室</Td>
                    <Td>
                      <Select onChange={(e) => setRoomId(e.target.value)}>
                        {DUMMY_ROOM.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name}
                          </option>
                        ))}
                      </Select>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>利用者</Td>
                    <Td>{user?.username}</Td>
                  </Tr>
                  <Tr>
                    <Td>開始時刻</Td>
                    <Td>
                      <Input
                        type='time'
                        onChange={(e) => setTimeOfStart(e.target.value)}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>終了時刻</Td>
                    <Td>
                      <Input
                        type='time'
                        onChange={(e) => setTimeOfEnd(e.target.value)}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>会議内容</Td>
                    <Td>
                      <Input
                        type='text'
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => onClickRegister()}>予約する</Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}
