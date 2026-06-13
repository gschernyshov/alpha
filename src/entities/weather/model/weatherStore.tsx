import { create } from 'zustand'
import { Humidity, Illumination, Temperature, WeatherDate } from './types'

type WeatherState = {
  temperature: {
    value: Temperature
    date: WeatherDate
  }
  humidity: {
    value: Humidity
    date: WeatherDate
  }
  illumination: {
    value: Illumination
    date: WeatherDate
  }
}

type WeatherActions = {
  setWeather: (data: Partial<WeatherState>) => void
  reset: () => void
}

const initialState: WeatherState = {
  temperature: {
    value: null,
    date: null,
  },
  humidity: {
    value: null,
    date: null,
  },
  illumination: {
    value: null,
    date: null,
  },
}

export const useWeatherStore = create<WeatherState & WeatherActions>(set => ({
  ...initialState,

  setWeather: data =>
    set(state => ({
      temperature: data.temperature ?? state.temperature,
      humidity: data.humidity ?? state.humidity,
      illumination: data.illumination ?? state.illumination,
    })),

  reset: () => set(initialState),
}))
