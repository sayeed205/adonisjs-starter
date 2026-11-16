import { Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import { type ReactNode } from 'react'

import FlashToasts from '~/components/flash_toasts'
import Logo from '~/components/logo'
import ThemeToggle from '~/components/theme_toggle'
import { buttonVariants } from '~/components/ui/button'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  const { props } = usePage()

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo size={28} />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {props.user ? (
              <Link route="dashboard" className={buttonVariants({ variant: 'default', size: 'sm' })}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link route="session.create" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                  Sign in
                </Link>
                <Link route="new_account.create" className={buttonVariants({ variant: 'default', size: 'sm' })}>
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <FlashToasts />
    </div>
  )
}
