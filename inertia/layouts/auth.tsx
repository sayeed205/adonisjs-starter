import { type ReactNode } from 'react'

import FlashToasts from '~/components/flash_toasts'
import Logo from '~/components/logo'
import ThemeToggle from '~/components/theme_toggle'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="mb-6 flex flex-col items-center gap-2">
        <Logo size={36} />
      </div>

      <div className="w-full max-w-sm">{children}</div>

      <FlashToasts />
    </div>
  )
}
