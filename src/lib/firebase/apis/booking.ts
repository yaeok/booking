import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase/config'

export const registerBooking = async (args: {
  roomId: string
  userId: string
  dateOfBooking: string
  timeOfStart: string
  timeOfEnd: string
  content: string
}) => {
  const colRef = collection(db, 'bookings')

  await addDoc(colRef, {
    room_id: args.roomId,
    user_id: args.userId,
    date_of_booking: args.dateOfBooking,
    time_of_start: args.timeOfStart,
    time_of_end: args.timeOfEnd,
    booking_content: args.content,
  }).then((docRef) => {
    updateDoc(docRef, { booking_id: docRef.id })
  })
}
