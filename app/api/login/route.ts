import {
  APPWRITE_ENDPOINT,
  APPWRITE_HOSTNAME,
  APPWRITE_PROJECT,
  SSR_HOSTNAME,
} from '@/app/_appwrite/client'
import { NextResponse } from 'next/server'
import * as setCookie from 'set-cookie-parser'

export function GET() {
  return NextResponse.json({ res: 'ok' })
}

export async function POST(request: Request) {
  const { email, password }: { email: string; password: string } =
    await request.json()

  // https://appwrite.io/docs/rest
  const response = await fetch(`${APPWRITE_ENDPOINT}/account/sessions/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': APPWRITE_PROJECT,
    },
    body: JSON.stringify({ email, password }),
  })

  const json = await response.json()

  if (json.code >= 400) {
    return NextResponse.json(
      { message: json.message },
      {
        status: 400,
      }
    )
  }

  const ssrHostname =
    SSR_HOSTNAME === 'localhost' ? SSR_HOSTNAME : '.' + SSR_HOSTNAME
  const appwriteHostname =
    APPWRITE_HOSTNAME === 'localhost'
      ? APPWRITE_HOSTNAME
      : '.' + APPWRITE_HOSTNAME

  const cookiesStr = (response.headers.get('set-cookie') ?? '')
    .split(appwriteHostname)
    .join(ssrHostname)

  const cookiesArray = setCookie.splitCookiesString(cookiesStr)
  const cookiesParsed = cookiesArray.map((cookie: any) =>
    setCookie.parseString(cookie)
  )

  const nextJsResponse = NextResponse.json(json)

  for (const cookie of cookiesParsed) {
    nextJsResponse.cookies.set(cookie.name, cookie.value, {
      domain: cookie.domain,
      secure: cookie.secure,
      sameSite: cookie.sameSite as any,
      path: cookie.path,
      maxAge: cookie.maxAge,
      httpOnly: cookie.httpOnly,
      expires: cookie.expires,
    })
  }

  return nextJsResponse
}
