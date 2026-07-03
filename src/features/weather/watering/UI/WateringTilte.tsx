import type { Plant } from '../model/types'

interface WateringTitleProps {
  title: Plant['title']
  name: Plant['name']
  latinName: Plant['latinName']
}

export const WateringTitle = ({
  title,
  name,
  latinName,
}: WateringTitleProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-4xl font-semibold">{title}</h2>
      {name && (
        <p className="text-md">
          {name}
          {latinName && (
            <span className="text-muted-foreground"> ({latinName})</span>
          )}
        </p>
      )}
    </div>
  )
}
