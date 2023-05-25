import 'server-only'
import { APPWRITE_PROJECT, setSession, getUserData } from './client'
import { cookies } from 'next/headers'

export async function getAccount() {
  const sessionNames = [
    'a_session_' + APPWRITE_PROJECT.toLowerCase(),
    'a_session_' + APPWRITE_PROJECT.toLowerCase() + '_legacy',
  ]

  const cookieStore = cookies()
  const hash =
    cookieStore.get(sessionNames[0]) ?? cookieStore.get(sessionNames[1]) ?? null
  setSession(hash ? hash.value : '')

  return getUserData()
}
