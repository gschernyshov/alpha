import Image from 'next/image'
import { Droplet } from 'lucide-react'
import { useModeStore } from '../model/modeStore'
import { PLANT_INFO_SECTIONS, PLANT_INFO } from '../config/info'
import { ANCHOR_WATERING } from '../config/anchor'
import { getHumidityColor } from '../lib/getHumidityColor'
import {
  type Mode,
  MODES,
  WeatherCard,
  WeatherCardHeader,
} from '@/entities/weather'
import { Button } from '@/shared/UI/shadcn/button'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/shared/UI/shadcn/tabs'
import { AlertMessage } from '@/shared/UI/AlertMessage'
import { ExpandableTextSection } from '@/shared/UI/ExpandableTextSection'

export const Watering = () => {
  const { mode, setMode } = useModeStore()

  const plantInfo =
    PLANT_INFO[
      MODES[mode as Extract<Mode, 'sypha' | 'newton' | 'hercules'>].label
    ]

  return (
    <WeatherCard
      id={ANCHOR_WATERING}
      colors={['#9CAF88', '#B7C9B2', '#8A9A8B']}
      classNames="w-full bg-gradient-to-br from-[#E9F5E9] via-[#E0F2E1] to-[#D4E7D6] dark:from-slate-800 dark:via-slate-700 dark:to-slate-700"
    >
      <WeatherCardHeader
        title={'Автополив'}
        mode={mode}
        availableModes={['sypha', 'newton', 'hercules']}
        onMode={setMode}
      />

      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
        <div className="relative min-w-[400px] md:pt-10">
          <Image
            alt="Изображение растения"
            src={plantInfo.img}
            height={400}
            sizes="(max-width: 768px) 300px, 400px"
            className="w-full h-auto object-cover max-w-[400px] mx-auto"
          />

          <div className="absolute bottom-3 right-20 md:left-20 md:right-auto flex flex-col gap-1.5 rounded-lg bg-black/30 backdrop-blur-sm px-2 py-1.5 text-white shadow-md">
            <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">
              Влажность почвы
            </span>
            <div className="flex items-center gap-1.5">
              <Droplet
                className="h-4 w-4 shrink-0"
                style={{
                  color: getHumidityColor(65),
                  fill: 'currentColor',
                }}
              />
              <span className="font-semibold text-sm">65%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-start gap-8 h-full">
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-semibold">{plantInfo.nickname}</span>
            <p className="text-md">
              {plantInfo.name}{' '}
              <span className="text-muted-foreground">
                ({plantInfo.scientificName})
              </span>
            </p>
          </div>

          <Tabs
            defaultValue="description"
            className="flex flex-col gap-4 w-full"
          >
            <TabsList className="flex justify-start flex-wrap gap-1.5 h-auto! p-0 md:p-1 bg-white/0 md:bg-emerald-50 dark:bg-slate-800 rounded-lg">
              {PLANT_INFO_SECTIONS.map(({ value, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={`
                    flex-[0_0_auto] 
                    px-3 py-1.5 rounded-md text-sm font-medium
                    bg-emerald-100 hover:bg-emerald-200 
                    text-emerald-700 hover:text-emerald-800
                    data-[state=active]:bg-emerald-600 data-[state=active]:hover:bg-emerald-600
                    data-[state=active]:text-white data-[state=active]:hover:text-white 
                    cursor-pointer
                `}
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {PLANT_INFO_SECTIONS.map(({ value }) => (
              <TabsContent key={value} value={value}>
                <ExpandableTextSection className="text-sm text-muted-foreground">
                  {plantInfo[value].map((paragraph, index) => (
                    <p key={index} className="mb-2">
                      {paragraph}
                    </p>
                  ))}
                </ExpandableTextSection>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex flex-row items-center justify-between md:justify-start gap-4 md:gap-15 w-full">
            <div className="flex flex-col gap-2">
              <span className="text-md font-semibold">
                Следующий полив через
              </span>
              <div className="flex items-baseline gap-2 md:gap-4">
                <span className="text-4xl md:text-5xl font-bold">2 дня</span>
                <span className="text-sm text-muted-foreground">
                  <span className="font-medium">25 мая, 15:00</span>
                </span>
              </div>

              <div className="mt-1 text-xs md:text-sm text-muted-foreground">
                <span className="font-medium">полив каждые 7 дней</span>
              </div>
            </div>

            <Button
              variant="outline"
              disabled={true}
              aria-label="Полить растение"
              className="h-27 w-14 md:w-27 shrink-0 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-md text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-white focus:ring-2 focus:ring-emerald-100"
            >
              <Droplet className="h-8 w-8" />
            </Button>
          </div>

          <AlertMessage
            title="Полейте, пока успеете!"
            message="Кнопка полива станет доступна за 3 дня до запланированного полива. Вы сможете полить растение вручную до 15:00 25 мая, чтобы отменить автоматический полив."
          />
        </div>
      </div>
    </WeatherCard>
  )
}
