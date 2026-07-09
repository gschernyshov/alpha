import { AlertMessage } from '@/shared/UI/AlertMessage'

interface WeatherErrorPageProps {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export const WeatherErrorPage = ({
  error,
  unstable_retry,
}: WeatherErrorPageProps) => {
  return (
    <AlertMessage
      message={error.message ?? 'Произошла неизвестная ошибка'}
      action={{ label: 'Перезагрузить', onClick: () => unstable_retry() }}
    />
  )
}
