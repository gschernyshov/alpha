import { InfoIcon } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/shared/UI/shadcn/alert'

interface AlertMessageProps {
  title?: string
  message: string
}
export const AlertMessage = ({ title, message }: AlertMessageProps) => {
  return (
    <Alert>
      <InfoIcon />
      <AlertTitle>{title ?? 'Предупреждение!'}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
