import { Link } from '@adonisjs/inertia/react'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Field, FieldError, FieldLabel } from '~/components/ui/field'
import { Form } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import AuthLayout from '~/layouts/auth'

export default function Login() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to continue building.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form route="session.store">
          {({ processing }) => (
            <div className="flex flex-col gap-4">
              <Field name="email">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" autoComplete="username" placeholder="you@example.com" />
                <FieldError />
              </Field>

              <Field name="password">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                <FieldError />
              </Field>

              <Button type="submit" disabled={processing} className="mt-2 w-full">
                {processing ? 'One moment…' : 'Sign in'}
              </Button>
            </div>
          )}
        </Form>
      </CardContent>

      <CardFooter className="text-muted-foreground justify-center text-sm">
        New here?{' '}
        <Link route="new_account.create" className="text-primary ml-1 underline-offset-4 hover:underline">
          Create an account
        </Link>
      </CardFooter>
    </Card>
  )
}

Login.layout = [AuthLayout]
