import { InfoIcon } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/shared/UI/shadcn/alert'

interface AlertMessageProps {
  title?: string
  message: string
  className?: string
}
export const AlertMessage = ({
  title,
  message,
  className,
}: AlertMessageProps) => {
  return (
    <Alert className={className}>
      <InfoIcon />
      <AlertTitle>{title ?? 'Предупреждение!'}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
