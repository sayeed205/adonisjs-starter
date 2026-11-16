import { type ReactNode } from 'react'

import NavLink, { type NavItem } from '~/components/nav_link'
import Page from '~/components/page'

/**
 * The pages of the settings area, listed in the sidebar. Register a route
 * for each page and add it here, for example:
 *
 * `{ label: 'Profile', route: 'settings.profile', icon: User }`
 */
const items: NavItem[] = []

/**
 * Renders the settings heading, a sidebar of links and a card holding the
 * current page. Nest it under the app layout from each settings page:
 *
 * `Profile.layout = [AppLayout, SettingsLayout]`
 */
export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <Page title="Settings" description="Manage your account settings and preferences.">
      <div className="flex flex-col gap-8 md:flex-row">
        {items.length > 0 && (
          <nav className="flex shrink-0 gap-1 md:w-64 md:flex-col" aria-label="Settings">
            {items.map(({ label, route, icon: Icon }) => (
              <NavLink key={label} route={route} exact>
                {Icon && <Icon className="size-4" />}
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        )}
        <div className="bg-card text-card-foreground flex-1 rounded-2xl border p-6 shadow-xs">{children}</div>
      </div>
    </Page>
  )
}
