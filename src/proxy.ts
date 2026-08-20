import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export default async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Prevent supabase initialization if env variables are missing to avoid crashing the whole app
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase environment variables are missing. Middleware is bypassed.');
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const isProtected = request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/auth');

  if (!isProtected) {
    return supabaseResponse;
  }

  // refreshing the auth token (only for protected routes)
  const { data: { user } } = await supabase.auth.getUser()
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    const redirectUrl = request.nextUrl.clone()
    const randomAccess = Math.floor(Math.random() * 900000) + 100000;
    redirectUrl.pathname = `/auth/akses-kades-${randomAccess}`
    return NextResponse.redirect(redirectUrl)
  }

  // If user is already logged in, redirect them away from the login page
  if (request.nextUrl.pathname.match(/^\/auth\/akses-kades-\d+/) && user) {
     const redirectUrl = request.nextUrl.clone()
     redirectUrl.pathname = '/admin'
     return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
