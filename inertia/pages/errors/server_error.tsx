import { Link } from '@adonisjs/inertia/react'
import { AlertTriangle, ArrowLeft } from 'lucide-react'

import { Badge } from '~/components/ui/badge'
import { buttonVariants } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import MarketingLayout from '~/layouts/marketing'

export default function ServerError() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-md text-center shadow-xs">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex justify-center">
            <Badge variant="destructive" className="gap-1 px-2.5 py-1 font-mono text-xs">
              <AlertTriangle className="size-3" /> 500
            </Badge>
          </div>
          <CardTitle className="font-heading text-2xl font-bold">Something broke</CardTitle>
          <CardDescription className="text-sm">The server hit an unexpected error.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Try again in a moment. If the problem persists, check the server logs for the underlying exception.
          </p>
          <div>
            <Link route="home" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

ServerError.layout = [MarketingLayout]
