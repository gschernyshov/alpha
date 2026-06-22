type Mood = {
  label: string
  minTemp: number
  maxTemp: number
  color: string
}

export const moods: Mood[] = [
  {
    label: 'Холодно',
    minTemp: -20,
    maxTemp: 0,
    color: '#1e90ff',
  },
  {
    label: 'Прохладно',
    minTemp: 0,
    maxTemp: 15,
    color: '#87ceeb',
  },
  {
    label: 'Тепло',
    minTemp: 15,
    maxTemp: 25,
    color: '#ffa500',
  },
  {
    label: 'Жарко',
    minTemp: 25,
    maxTemp: 40,
    color: '#ff4500',
  },
]
