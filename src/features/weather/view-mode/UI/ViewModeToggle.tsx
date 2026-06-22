import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useViewModeStore } from '../model/viewModeStore'
import { Button } from '@/shared/UI/shadcn/button'

export const ViewModeToggle = () => {
  const { viewMode, toggleViewMode } = useViewModeStore()

  return viewMode === 'full' ? (
    <Button
      onClick={() => toggleViewMode()}
      className="flex items-center gap-4 px-10! py-8! bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl text-md text-white font-semibold cursor-pointer"
    >
      Показания метесотанции
      <ArrowRight />
    </Button>
  ) : (
    <Button
      onClick={() => toggleViewMode()}
      variant="outline"
      className="flex items-center gap-2 cursor-pointer"
    >
      <ArrowLeft />
      Назад
    </Button>
  )
}
