import { Booking } from '@/common/models/booking.type'

export const DUMMY_BOOKING = [
  {
    id: '0',
    roomId: '0',
    userId: '1',
    dateOfBooking: '2023/07/15',
    timeOfStart: '00:00',
    timeOfEnd: '01:00',
    content: '会議',
  } as Booking,
  {
    id: '1',
    roomId: '1',
    userId: '2',
    dateOfBooking: '2023/07/13',
    timeOfStart: '01:00',
    timeOfEnd: '02:00',
    content: '面談',
  } as Booking,
  {
    id: '2',
    roomId: '0',
    userId: '3',
    dateOfBooking: '2023/07/13',
    timeOfStart: '02:00',
    timeOfEnd: '03:00',
    content: '面接',
  } as Booking,
  {
    id: '3',
    roomId: '1',
    userId: '4',
    dateOfBooking: '2023/07/12',
    timeOfStart: '03:00',
    timeOfEnd: '04:00',
    content: '商談',
  } as Booking,
]

export const DUMMY_ROOM = [
  {
    id: '0',
    name: '会議室A',
  },
  {
    id: '1',
    name: '会議室B',
  },
]
