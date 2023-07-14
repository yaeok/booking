import { startOfMinute } from 'date-fns'

// 予約登録画面のバリデーションチェック
export const validateReservationForm = (args: {
  roomId: string
  dateOfBooking: string
  timeOfStart: string
  timeOfEnd: string
  content: string
}): string => {
  if (args.roomId === '') {
    return '会議室を選択してください'
  }
  if (args.dateOfBooking === '') {
    return '日付を選択してください'
  }
  if (args.timeOfStart === '') {
    return '開始時間を選択してください'
  }
  if (args.timeOfEnd === '') {
    return '終了時間を選択してください'
  }
  if (args.content === '') {
    return '内容を入力してください'
  }
  const today = new Date()
  const select = new Date(args.dateOfBooking)
  // 日付のみの比較のため、時刻を0時0分に設定
  const changeToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )
  const changeDate = new Date(
    select.getFullYear(),
    select.getMonth(),
    select.getDate()
  )
  console.log(changeDate, changeToday)
  if (changeDate < changeToday) {
    return '過去の日付は選択できません'
  }

  const start = new Date(`1970/01/01 ${args.timeOfStart}`)
  const end = new Date(`1970/01/01 ${args.timeOfEnd}`)

  if (end <= start) {
    return '終了時間は開始時間より後に設定してください'
  }

  return ''
}
