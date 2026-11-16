import { LayoutGrid, Sparkles } from 'lucide-react'

import Page from '~/components/page'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import AppLayout from '~/layouts/app'

export default function Dashboard() {
  return (
    <Page title="Dashboard" hideTitle>
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <Card className="w-full max-w-md border-dashed shadow-xs">
          <CardHeader className="flex flex-col items-center space-y-3 pb-2">
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
              <LayoutGrid className="size-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <CardTitle className="text-xl">Your dashboard is ready</CardTitle>
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="size-3" /> Starter
                </Badge>
              </div>
              <CardDescription className="text-muted-foreground text-sm">
                It&apos;s empty on purpose. A clean starting point with nothing to undo. Add your first route and
                component to begin.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="bg-muted/60 text-muted-foreground inline-block rounded-lg px-3 py-1.5 font-mono text-xs">
              Start in <code className="text-foreground font-semibold">inertia/pages/dashboard.tsx</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}

Dashboard.layout = [AppLayout]
