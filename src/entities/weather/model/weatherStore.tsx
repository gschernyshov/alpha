import { create } from 'zustand'
import type { WeatherIndoor, WeatherOutdoor } from './types'

type WeatherState = {
  indoor: WeatherIndoor
  outdoor: WeatherOutdoor
}

type WeatherActions = {
  setWeather: (data: WeatherState) => void
  reset: () => void
}

type WeatherStoreState = WeatherState & WeatherActions

const initialState: WeatherState = {
  indoor: {
    temperature: null,
    humidity: null,
    illumination: null,
    date: null,
  },
  outdoor: {
    temp: null,
    feelsLike: null,
    humidity: null,
    pressure: null,
    windSpeed: null,
    time: null,
  },
}

export const useWeatherStore = create<WeatherStoreState>(set => ({
  ...initialState,

  setWeather: data =>
    set(state => ({
      indoor: {
        temperature: data.indoor?.temperature ?? state.indoor.temperature,
        humidity: data.indoor?.humidity ?? state.indoor.humidity,
        illumination: data.indoor?.illumination ?? state.indoor.illumination,
        date: data.indoor?.date ?? state.indoor.date,
      },
      outdoor: {
        temp: data.outdoor?.temp ?? state.outdoor.temp,
        feelsLike: data.outdoor?.feelsLike ?? state.outdoor.feelsLike,
        humidity: data.outdoor?.humidity ?? state.outdoor.humidity,
        pressure: data.outdoor?.pressure ?? state.outdoor.pressure,
        windSpeed: data.outdoor?.windSpeed ?? state.outdoor.windSpeed,
        time: data.outdoor?.time ?? state.outdoor.time,
      },
    })),

  reset: () => set(initialState),
}))
