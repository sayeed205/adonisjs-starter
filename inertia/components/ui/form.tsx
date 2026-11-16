import {
  type FormActionProps,
  type FormRouteProps,
  type FormSlotProps,
  Form as InertiaForm,
} from '@adonisjs/inertia/react'
import { Form as FormPrimitive } from '@base-ui/react/form'
import { routes } from '@generated/registry'
import { cn } from 'cn'

import type React from 'react'

type KnownRoute = keyof typeof routes

function Form<Route extends KnownRoute>(
  props: FormRouteProps<Route> & {
    className?: string
  },
): React.JSX.Element
function Form<FormData extends object>(
  props: FormActionProps<FormData> & {
    className?: string
  },
): React.JSX.Element
function Form(props: any): React.JSX.Element {
  const { className, children, ...inertiaProps } = props

  return (
    <InertiaForm {...inertiaProps}>
      {(slotProps: FormSlotProps<any>) => {
        const isRenderProp = children instanceof Function
        // SAFETY: Slot props from Inertia form are forwarded to the child render function.
        const content = isRenderProp
          ? (children as (props: FormSlotProps<Record<string, never>>) => React.ReactNode)(slotProps)
          : children

        return (
          <FormPrimitive
            errors={slotProps.errors}
            render={<div />}
            className={cn('flex w-full flex-col gap-4', className)}
          >
            {content}
          </FormPrimitive>
        )
      }}
    </InertiaForm>
  )
}

export { Form }
