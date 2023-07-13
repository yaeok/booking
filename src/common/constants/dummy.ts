import { Booking } from '../models/booking.model'

export const DUMMY = [
  {
    id: '0',
    dateOfBooking: '2023/07/15',
    timeOfStart: '00:00',
    timeOfEnd: '01:00',
    content: '会議',
  } as Booking,
  {
    id: '1',
    dateOfBooking: '2023/07/13',
    timeOfStart: '01:00',
    timeOfEnd: '02:00',
    content: '面談',
  } as Booking,
  {
    id: '2',
    dateOfBooking: '2023/07/13',
    timeOfStart: '02:00',
    timeOfEnd: '03:00',
    content: '面接',
  } as Booking,
  {
    id: '3',
    dateOfBooking: '2023/07/12',
    timeOfStart: '03:00',
    timeOfEnd: '04:00',
    content: '商談',
  } as Booking,
]
