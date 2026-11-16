import { usePage } from '@inertiajs/react'
import { cn } from 'cn'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

const COOKIE = 'app_theme'
const ONE_YEAR = 60 * 60 * 24 * 365

function getSystemPreference(): 'dark' | 'light' {
  if (!globalThis.window) {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyThemeToDocument(theme: Theme) {
  if (!globalThis.document) {
    return
  }

  const root = document.documentElement
  const effectiveTheme = theme === 'system' ? getSystemPreference() : theme
  const isDark = effectiveTheme === 'dark'

  root.classList.toggle('dark', isDark)
  root.setAttribute('data-theme', effectiveTheme)
}

export default function ThemeToggle({ className }: { className?: string }) {
  const page = usePage()
  // SAFETY: Inferred preferences theme from Inertia props matches Theme union.
  const serverTheme = page.props.preferences?.theme as Theme | undefined
  const [theme, setTheme] = useState<Theme>(serverTheme ?? 'system')

  const selectTheme = (next: Theme) => {
    setTheme(next)
    applyThemeToDocument(next)
    document.cookie = `${COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`

    try {
      window.localStorage.setItem('theme', next)
    } catch {}
  }

  useEffect(() => {
    applyThemeToDocument(theme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleMediaChange = () => {
      if (theme === 'system') {
        applyThemeToDocument('system')
      }
    }

    mediaQuery.addEventListener('change', handleMediaChange)

    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [theme])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 'd' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          (e.target instanceof HTMLElement && e.target.isContentEditable)
        )
      ) {
        setTheme((current) => {
          const next: Theme = current === 'dark' ? 'light' : 'dark'
          selectTheme(next)

          return next
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      aria-label="Theme switcher"
      className={cn(
        'border-border/80 bg-muted/60 inline-flex items-center rounded-full border p-0.5 shadow-xs transition-colors',
        className,
      )}
      title="Theme: System, Light, Dark (Press 'd' to toggle)"
    >
      <button
        type="button"
        aria-pressed={theme === 'system'}
        aria-label="System theme"
        onClick={() => selectTheme('system')}
        className={cn(
          'text-muted-foreground hover:text-foreground flex size-7 items-center justify-center rounded-full transition-all',
          theme === 'system' && 'bg-background text-foreground font-medium shadow-xs',
        )}
      >
        <Monitor className="size-3.5" />
      </button>
      <button
        type="button"
        aria-pressed={theme === 'light'}
        aria-label="Light theme"
        onClick={() => selectTheme('light')}
        className={cn(
          'text-muted-foreground hover:text-foreground flex size-7 items-center justify-center rounded-full transition-all',
          theme === 'light' && 'bg-background text-foreground font-medium shadow-xs',
        )}
      >
        <Sun className="size-3.5" />
      </button>
      <button
        type="button"
        aria-pressed={theme === 'dark'}
        aria-label="Dark theme"
        onClick={() => selectTheme('dark')}
        className={cn(
          'text-muted-foreground hover:text-foreground flex size-7 items-center justify-center rounded-full transition-all',
          theme === 'dark' && 'bg-background text-foreground font-medium shadow-xs',
        )}
      >
        <Moon className="size-3.5" />
      </button>
    </div>
  )
}
