import { type ReactNode } from 'react'

/**
 * A group of content within a page, such as a group of form fields, with
 * an optional title and description. Stack several sections and they are
 * separated by a divider.
 */
export default function Section({
  title,
  description,
  children,
}: {
  title?: string
  description?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      {(title || description) && (
        <header className="space-y-1">
          {title && <h2 className="text-lg font-semibold tracking-tight">{title}</h2>}
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </header>
      )}
      <div>{children}</div>
    </section>
  )
}
