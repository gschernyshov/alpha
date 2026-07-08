import { redirect } from 'next/navigation'
// import { AlertMessage } from '@/shared/UI/AlertMessage'

export const HomePage = () => {
  redirect('/weather')

  // return (
  //   <AlertMessage message="К сожалению, данный раздел находится на этапе разработки!" />
  // )
}
