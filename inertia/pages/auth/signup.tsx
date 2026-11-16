import { Link } from '@adonisjs/inertia/react'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Field, FieldError, FieldLabel } from '~/components/ui/field'
import { Form } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import AuthLayout from '~/layouts/auth'

export default function Signup() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Start building with the starter kit.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form route="new_account.store">
          {({ processing }) => (
            <div className="flex flex-col gap-4">
              <Field name="fullName">
                <FieldLabel htmlFor="fullName">Full name</FieldLabel>
                <Input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="Ada Lovelace" />
                <FieldError />
              </Field>

              <Field name="email">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
                <FieldError />
              </Field>

              <Field name="password">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
                <FieldError />
              </Field>

              <Field name="passwordConfirmation">
                <FieldLabel htmlFor="passwordConfirmation">Confirm password</FieldLabel>
                <Input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
                <FieldError />
              </Field>

              <Button type="submit" disabled={processing} className="mt-2 w-full">
                {processing ? 'One moment…' : 'Create account'}
              </Button>
            </div>
          )}
        </Form>
      </CardContent>

      <CardFooter className="text-muted-foreground justify-center text-sm">
        Already have an account?{' '}
        <Link route="session.create" className="text-primary ml-1 underline-offset-4 hover:underline">
          Sign in
        </Link>
      </CardFooter>
    </Card>
  )
}

Signup.layout = [AuthLayout]
