import Link from 'next/link'
import {
  HomeIcon,
  PlusIcon,
  LogOutIcon,
  LogInIcon,
  UserIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationProps {
  user?: { id: string; email: string } | null
}

export default function Navigation({ user }: NavigationProps) {
  return (
    <aside className="fixed inset-y-0 left-0 w-16 md:w-64 bg-gray-50 dark:bg-[#1A1A1A] border-r border-gray-200 dark:border-dark-border-subtle flex flex-col py-4 px-2 md:px-4">
      <div className="flex items-center justify-center md:justify-start mb-8 px-2">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          <span className="hidden md:inline">Mode</span>
          <span className="md:hidden">M</span>
        </Link>
      </div>

      <nav className="flex-1 flex flex-col space-y-1">
        <NavLink
          href="/dashboard"
          icon={<HomeIcon size={20} />}
          label="Dashboard"
        />
        <NavLink
          href="/issues/new"
          icon={<PlusIcon size={20} />}
          label="New Issue"
        />
      </nav>

      <div className="pt-4 border-t border-gray-200 dark:border-dark-border-subtle">
        {user ? (
          <div className="space-y-1">
            <div className="flex items-center justify-start px-2 py-2">
              <UserIcon size={20} className="text-gray-500 mr-2" />
              <span className="hidden md:inline text-sm text-gray-700 dark:text-gray-300 truncate">
                {user.email}
              </span>
            </div>
            <NavLink
              href="/api/auth/signout"
              icon={<LogOutIcon size={20} />}
              label="Sign Out"
            />
          </div>
        ) : (
          <NavLink
            href="/signin"
            icon={<LogInIcon size={20} />}
            label="Sign In"
          />
        )}
      </div>
    </aside>
  )
}

interface NavLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

function NavLink({ href, icon, label, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center px-2 py-2 text-sm font-medium rounded-md group',
        isActive
          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
      )}
    >
      <span className="text-gray-500 dark:text-gray-400 mr-3">{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </Link>
  )
}
