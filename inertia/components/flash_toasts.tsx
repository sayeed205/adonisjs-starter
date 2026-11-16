import { router, usePage } from '@inertiajs/react'
import { CircleAlert, CircleCheck, Info, Loader2, TriangleAlert } from 'lucide-react'
import { useEffect } from 'react'
import { toast, Toaster, type ToasterProps } from 'sonner'

export default function FlashToasts(props: ToasterProps) {
  const { flash } = usePage()

  useEffect(() => {
    return router.on('start', () => toast.dismiss('flash'))
  }, [])

  useEffect(() => {
    if (flash.error) {
      toast.error(flash.error, { id: 'flash' })
    }

    if (flash.success) {
      toast.success(flash.success, { id: 'flash' })
    }
  }, [flash])

  // SAFETY: Custom CSS variables for Sonner popover tokens.
  const customStyles = {
    '--normal-bg': 'var(--popover)',
    '--normal-text': 'var(--popover-foreground)',
    '--normal-border': 'var(--border)',
    '--border-radius': 'var(--radius)',
  } as React.CSSProperties

  return (
    <Toaster
      position="top-center"
      icons={{
        success: <CircleCheck className="size-4" />,
        info: <Info className="size-4" />,
        warning: <TriangleAlert className="size-4" />,
        error: <CircleAlert className="size-4" />,
        loading: <Loader2 className="size-4 animate-spin" />,
      }}
      style={customStyles}
      richColors
      {...props}
    />
  )
}
