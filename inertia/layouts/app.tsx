import { router, usePage } from '@inertiajs/react'
import { House, LogOut } from 'lucide-react'
import { type ReactNode } from 'react'

import { urlFor } from '~/client'
import FlashToasts from '~/components/flash_toasts'
import Logo from '~/components/logo'
import NavLink, { type NavItem } from '~/components/nav_link'
import ThemeToggle from '~/components/theme_toggle'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

/**
 * Top-level app navigation. Add an entry here for every new area of your
 * app, and it shows up in the navigation bar with its active state handled.
 */
const nav: NavItem[] = [{ label: 'Dashboard', route: 'dashboard', icon: House }]

export default function AppLayout({ children }: { children: ReactNode }) {
  const { props } = usePage()
  const user = props.user

  const handleLogout = () => {
    router.post(urlFor('session.destroy'))
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Logo size={28} />
            <nav className="flex items-center gap-1 sm:gap-2">
              {nav.map(({ label, route, icon: Icon }) => (
                <NavLink key={label} route={route}>
                  {Icon && <Icon className="size-4" />}
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus-visible:ring-ring flex cursor-pointer items-center gap-2 rounded-full outline-none focus-visible:ring-2">
                  <Avatar size="sm">
                    <AvatarFallback className="text-xs font-semibold">
                      {user.initials || user.fullName?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm leading-none font-medium">{user.fullName}</p>
                      <p className="text-muted-foreground text-xs leading-none">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Log out</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
      <FlashToasts />
    </div>
  )
}
