import { Account, AppwriteException, Client } from 'appwrite'

export const SSR_HOSTNAME = process.env.NEXT_PUBLIC_SSR_HOSTNAME!
export const APPWRITE_HOSTNAME = process.env.NEXT_PUBLIC_APPWRITE_HOSTNAME!
export const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!
export const APPWRITE_PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT!

const client = new Client()

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT)

export async function login(email: string, password: string) {
  await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function getUserData() {
  try {
    const account = new Account(client)
    return [await account.get(), null] as const
  } catch (error) {
    const appwriteError = error as AppwriteException
    return [undefined, new Error(appwriteError.message)] as const
  }
}

export async function logout() {
  try {
    const account = new Account(client)
    return [await account.deleteSession('current'), null] as const
  } catch (error) {
    const appwriteError = error as AppwriteException
    return [undefined, new Error(appwriteError.message)] as const
  }
}

export function setSession(hash: string) {
  const authCookies: any = {}
  authCookies['a_session_' + APPWRITE_PROJECT] = hash
  client.headers['X-Fallback-Cookies'] = JSON.stringify(authCookies)
}

export default client
