import { useState, type ReactNode } from 'react'

interface ExpandableTextSectionProps {
  className?: string
  children: ReactNode
}

export const ExpandableTextSection = ({
  className = '',
  children,
}: ExpandableTextSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <p
        className={`text-sm text-muted-foreground cursor-pointer ${className} ${isExpanded ? '' : `line-clamp-3`}`}
        onClick={() => setIsExpanded(prev => !prev)}
      >
        {children}
      </p>

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
