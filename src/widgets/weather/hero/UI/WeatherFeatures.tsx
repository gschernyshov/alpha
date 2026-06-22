import { Feature } from './WeatherFeature'
import { features } from '../config/features'

export const WeatherFeatures = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 mt-4">
      {features.map(feature => {
        const { id, Icon, title, description } = feature

        return (
          <Feature
            key={title}
            id={id}
            Icon={Icon}
            title={title}
            description={description}
          />
        )
      })}
    </div>
  )
}
