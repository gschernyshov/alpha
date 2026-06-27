import { WateringInfo } from './WateringInfo'
import { fetchPlants } from '../api/fetchPlants'

export const Watering = async () => {
  const plants = await fetchPlants()

  return <WateringInfo plants={plants} />
}
