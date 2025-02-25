import { compare, hash } from 'bcrypt'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import * as jose from 'jose'

// JWT types
interface JWTPayload {
  userId: string
  [key: string]: string | number | boolean | null | undefined
}

// Secret key for JWT signing (in a real app, use an environment variable)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-chars-long!!!'
)

// JWT expiration time
const JWT_EXPIRATION = '7d' // 7 days

// Token refresh threshold (refresh if less than this time left)
const REFRESH_THRESHOLD = 24 * 60 * 60 // 24 hours in seconds

// Hash a password
export async function hashPassword(password: string) {
  return hash(password, 10)
}

// Verify a password
export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

// Create a new user
export async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password)
  const id = nanoid()

  try {
    await db.insert(users).values({
      id,
      email,
      password: hashedPassword,
    })

    return { id, email }
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

// Get user by email
export async function getUserByEmail(email: string) {
  try {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0] || null
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

// Get user by ID
export async function getUserById(id: string) {
  try {
    const result = await db.select().from(users).where(eq(users.id, id))
    return result[0] || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
}

// Generate a JWT token
export async function generateJWT(payload: JWTPayload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET)
}

// Verify a JWT token
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

// Check if token needs refresh
export async function shouldRefreshToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      clockTolerance: 15, // 15 seconds tolerance for clock skew
    })

    // Get expiration time
    const exp = payload.exp as number
    const now = Math.floor(Date.now() / 1000)

    // If token expires within the threshold, refresh it
    return exp - now < REFRESH_THRESHOLD
  } catch {
    // If verification fails, token is invalid or expired
    return false
  }
}

// Create a session using JWT
export async function createSession(userId: string) {
  try {
    // Create JWT with user data
    const token = await generateJWT({ userId })

    // Store JWT in a cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    })

    return true
  } catch (error) {
    console.error('Error creating session:', error)
    return false
  }
}

// Refresh the JWT token if needed
export async function refreshTokenIfNeeded() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) return false

    // Check if token needs refresh
    const needsRefresh = await shouldRefreshToken(token)

    if (needsRefresh) {
      // Verify current token
      const payload = await verifyJWT(token)
      if (!payload) return false

      // Create new token with same payload
      const newToken = await generateJWT({ userId: payload.userId })

      // Update cookie with new token
      cookieStore.set({
        name: 'auth_token',
        value: newToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
        sameSite: 'lax',
      })

      return true
    }

    return false
  } catch (error) {
    console.error('Error refreshing token:', error)
    return false
  }
}

// Get current session from JWT
export async function getSession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) return null

    // Check if token needs refresh (do this silently in the background)
    refreshTokenIfNeeded().catch(console.error)

    const payload = await verifyJWT(token)
    return payload ? { userId: payload.userId } : null
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

// Delete session by clearing the JWT cookie
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
}

// Current user
export async function getCurrentUser() {
  const session = await getSession()
  if (!session) return null

  return getUserById(session.userId)
}
