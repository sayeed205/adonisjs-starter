import { Field as FieldPrimitive } from '@base-ui/react/field'
import { cn } from 'cn'

function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      className={cn('flex w-full flex-col items-start gap-2', className)}
      data-slot="field"
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      className={cn('text-foreground inline-flex items-center gap-2 text-sm font-medium', className)}
      data-slot="field-label"
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      className={cn('text-muted-foreground text-xs', className)}
      data-slot="field-description"
      {...props}
    />
  )
}

function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      className={cn('text-destructive text-xs font-normal', className)}
      data-slot="field-error"
      {...props}
    />
  )
}

const FieldControl = FieldPrimitive.Control
const FieldItem = FieldPrimitive.Item
const FieldValidity = FieldPrimitive.Validity

export { Field, FieldLabel, FieldDescription, FieldError, FieldControl, FieldItem, FieldValidity }
