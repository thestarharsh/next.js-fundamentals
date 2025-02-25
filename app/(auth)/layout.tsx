import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  // If user is already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return children
}
