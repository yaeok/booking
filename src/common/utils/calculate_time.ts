export const calculateTime = (startTime: string, endTime: string) => {
  const start = parseInt(startTime.slice(0, 2), 10)
  const end = parseInt(endTime.slice(0, 2), 10)
  const numbers: number[] = []
  for (let i = start; i <= end; i++) {
    numbers.push(i)
  }
  return numbers
}
