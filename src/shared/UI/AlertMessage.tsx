import { InfoIcon } from 'lucide-react'
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from '@/shared/UI/shadcn/alert'
import { Button } from '@/shared/UI/shadcn/button'

interface AlertMessageProps {
  title?: string
  message: string
  className?: string
  action?: {
    label: string
    onClick: () => void
  }
}
export const AlertMessage = ({
  title,
  message,
  className,
  action,
}: AlertMessageProps) => {
  return (
    <Alert className={className}>
      <InfoIcon />
      <AlertTitle>{title ?? 'Предупреждение!'}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      {action && (
        <AlertAction>
          <Button
            size="xs"
            variant="default"
            className="px-3 py-3 cursor-pointer"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </AlertAction>
      )}
    </Alert>
  )
}
