import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import Button from '@/app/components/ui/Button'

export default async function LandingPage() {
  const user = await getCurrentUser()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Linear Clone
            </span>
          </div>
          <div>
            {user ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/signin">
                  <Button variant="outline">Sign in</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Issue tracking <br className="hidden sm:block" />
              <span className="text-indigo-600 dark:text-indigo-500">
                simplified
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              A minimal and elegant issue tracking tool inspired by Linear.
              Manage your projects with ease.
            </p>
            <div className="mt-10">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/signup">
                  <Button size="lg">Get Started</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} Linear Clone. Built for Next.js
              Fundamentals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
