import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import type { LucideProps } from 'lucide-react'

interface FeatureProps {
  id: string
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  title: string
  description: string
}

export const Feature = ({ id, Icon, title, description }: FeatureProps) => {
  return (
    <div className="relative flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer">
      <div className="text-cyan-400">{<Icon />}</div>

      <div>
        <div className="font-medium text-white">{title}</div>

        <div className="text-sm text-zinc-500">{description}</div>
      </div>

      <a href={`#${id}`} className="absolute inset-0" />
    </div>
  )
}
