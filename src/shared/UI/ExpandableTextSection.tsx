import { useState, type ReactNode } from 'react'

interface ExpandableTextSectionProps {
  maxVisibleLines?: number
  className?: string
  children: ReactNode
}

export const ExpandableTextSection = ({
  maxVisibleLines = 3,
  className = '',
  children,
}: ExpandableTextSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`text-sm text-muted-foreground cursor-pointer ${className} ${isExpanded ? '' : `line-clamp-${maxVisibleLines}`}`}
        onClick={() => setIsExpanded(prev => !prev)}
      >
        {children}
      </div>

      <p
        className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium cursor-pointer"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        {isExpanded ? (
          'Скрыть'
        ) : (
          <>
            Подробнее <span aria-hidden="true">→</span>
          </>
        )}
      </p>
    </div>
  )
}
