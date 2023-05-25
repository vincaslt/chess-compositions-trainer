import { getAccount } from '@/app/_appwrite/server-client'
import { redirect } from 'next/navigation'

export default async function Home() {
  const [userData, err] = await getAccount()

  if (err) {
    redirect('/login')
  }

  return <main className="flex text-white">{userData.email}</main>
}
