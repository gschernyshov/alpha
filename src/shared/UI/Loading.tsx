import { Spinner } from './shadcn/spinner'

export const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Spinner className="size-8" />
    </div>
  )
}
