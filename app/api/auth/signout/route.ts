import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/auth'

export async function GET() {
  try {
    await deleteSession()
    return NextResponse.redirect(
      new URL(
        '/signin',
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      )
    )
  } catch (error) {
    console.error('Sign out error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
