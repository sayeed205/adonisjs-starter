import { Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import { cn } from 'cn'
import { type LucideIcon } from 'lucide-react'
import { type ReactNode } from 'react'

import { urlFor } from '~/client'

export type NavRoute = Parameters<typeof urlFor>[0]

export interface NavItem {
  label: string
  route: NavRoute
  icon?: LucideIcon
}

/**
 * A link that marks itself with `aria-current="page"` when the current URL
 * matches its route. By default nested URLs count as a match, so a
 * "Settings" link stays active on "/settings/security". Pass `exact` to
 * only match the route itself.
 */
export default function NavLink({
  route,
  exact = false,
  className,
  children,
}: {
  route: NavRoute
  exact?: boolean
  className?: string
  children: ReactNode
}) {
  const { url } = usePage()
  const href = urlFor(route)
  const path = url.split('?')[0]
  const isActive = exact ? path === href : path === href || path.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
        isActive
          ? 'bg-secondary text-secondary-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        className,
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
