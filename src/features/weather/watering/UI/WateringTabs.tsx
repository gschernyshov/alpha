import { useMemo } from 'react'
import { Activity } from 'lucide-react'
import { WaterStatus, type Plant } from '../model/types'
import { getWateringInfo } from '../lib/getWateringInfo'
import { getPluralizeDays } from '../lib/getPluralizeDays'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/UI/shadcn/tabs'
import { ExpandableTextSection } from '@/shared/UI/ExpandableTextSection'

interface WateringTabsProps {
  plant: Plant
}

export const WateringTabs = ({ plant }: WateringTabsProps) => {
  const { lastWatering, nextWatering, diffWatering } = getWateringInfo(
    plant.lastWaterDate,
    plant.wateringIntervalDays
  )

  const plantSections = useMemo(() => {
    return (
      [
        {
          value: 'description',
          name: 'Описание',
        },
        {
          value: 'lightRequirements',
          name: 'Свет',
        },
        {
          value: 'temperatureRequirements',
          name: 'Температура',
        },
        {
          value: 'wateringRequirements',
          name: 'Полив',
        },
        {
          value: 'waterInfo',
          name: <Activity />,
        },
      ] as const
    ).map(({ value, name }) => ({
      value,
      name,
      content:
        typeof name === 'string'
          ? (plant[value] ?? 'Данные отсутствуют')
          : (() => {
              const statusText =
                plant.waterStatus === WaterStatus.Pending
                  ? `Запрос на последний полив был отправлен ${lastWatering} (ожидание подтверждения).\n`
                  : plant.waterStatus === WaterStatus.Manual
                    ? `Последний полив был осуществлён в ручном режиме ${lastWatering}.\n`
                    : plant.waterStatus === WaterStatus.Success
                      ? `Последний полив был осуществлён в автоматическом режиме ${lastWatering}.\n`
                      : plant.waterStatus === WaterStatus.Failed
                        ? `Не удалось отправить запрос на полив ${lastWatering}.\n`
                        : ''

              const pluralizedInterval = getPluralizeDays(
                plant.wateringIntervalDays
              )

              return `${statusText}Периодичность поливов: каждые ${pluralizedInterval}.\nСледующий полив ${diffWatering !== null && diffWatering >= 0 ? 'планируется' : 'планировался'} ${nextWatering}.`.trim()
            })(),
    }))
  }, [plant, lastWatering, nextWatering, diffWatering])

  return (
    <Tabs defaultValue="description" className="flex flex-col gap-4 w-full">
      <TabsList className="flex justify-start flex-wrap gap-1.5 h-auto! p-0 md:p-1 bg-white/0 md:bg-emerald-50 md:dark:bg-slate-800 rounded-lg">
        {plantSections.map(({ value, name }) => (
          <TabsTrigger
            key={value}
            value={value}
            defaultValue="description"
            className="
              flex-[0_0_auto]
              px-3 py-1.5 rounded-md 
              bg-emerald-100 hover:bg-emerald-200
              dark:bg-slate-700 dark:hover:bg-slate-600
              data-[state=active]:bg-emerald-600 data-[state=active]:hover:bg-emerald-600
              text-sm text-emerald-700 hover:text-emerald-800 font-medium 
              data-[state=active]:text-white data-[state=active]:hover:text-white
              cursor-pointer
            "
          >
            {name}
          </TabsTrigger>
        ))}
      </TabsList>

      {plantSections.map(({ value, name, content }) => (
        <TabsContent key={value} value={value}>
          {typeof name === 'string' ? (
            <ExpandableTextSection className="text-sm whitespace-pre-wrap text-muted-foreground">
              {content}
            </ExpandableTextSection>
          ) : (
            <p className="text-sm whitespace-pre-wrap text-muted-foreground">
              {content}
            </p>
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}
