import { NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/auth'
import { isValidEmail } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const user = await createUser(email, password)

    if (!user) {
      return NextResponse.json(
        { message: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Return user info (excluding password)
    return NextResponse.json({
      id: user.id,
      email: user.email,
    })
  } catch (error) {
    console.error('Sign up error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
