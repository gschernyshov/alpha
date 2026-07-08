import { redirect } from 'next/navigation'

export const NotFoundPage = () => {
  redirect('/weather')
}
