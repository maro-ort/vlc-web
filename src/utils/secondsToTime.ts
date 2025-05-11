function padValue (value: number): string {
  return String(value).padStart(2, '0')
}

export default function secondsToTime (totalSeconds = 0): string {
  if (totalSeconds === 0) return '--:--:--'

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60)
  const seconds = totalSeconds - hours * 3600 - minutes * 60

  return `${padValue(hours)}:${padValue(minutes)}:${padValue(seconds)}`
}
