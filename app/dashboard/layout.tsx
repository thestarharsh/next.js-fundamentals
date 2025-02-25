import { getCurrentUser } from '@/lib/auth'
import Navigation from '../components/Navigation'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  // If user is not authenticated, redirect to sign in
  if (!user) {
    redirect('/signin')
  }

  return (
    <div className="min-h-screen">
      <Navigation user={user} />
      <main className="pl-16 md:pl-64 pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
