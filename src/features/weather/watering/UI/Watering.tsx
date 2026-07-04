import { WateringInfo } from './WateringInfo'
import { fetchPlants } from '../api/fetchPlants'

export const Watering = async () => {
  const initPlants = await fetchPlants()

  return <WateringInfo initPlants={initPlants} />
}
