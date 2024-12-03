import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export default async function Home() {
  const headersList = headers()
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <main className="flex flex-col items-center justify-center w-full max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-center text-foreground">
          Welcome to Easy Money Sniper
        </h1>
        
        <p className="text-xl text-center text-muted-foreground">
          Your personal finance tracking assistant
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {!user ? (
            <>
              <Button
                href="/signin"
                variant="default"
                className="w-full sm:w-auto"
              >
                Sign In
              </Button>
              <Button
                href="/signup"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Create Account
              </Button>
            </>
          ) : (
            <>
              <Button
                href="/dashboard"
                variant="default"
                className="w-full sm:w-auto"
              >
                Go to Dashboard
              </Button>
              <Button
                href="/account"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Account Settings
              </Button>
            </>
          )}
        </div>

        <div className="grid gap-8 mt-12 sm:grid-cols-3">
          <FeatureCard
            title="Track Expenses"
            description="Easily log and categorize your daily expenses"
            icon="💰"
          />
          <FeatureCard
            title="Set Goals"
            description="Create and monitor your financial goals"
            icon="🎯"
          />
          <FeatureCard
            title="Get Insights"
            description="Visualize your spending patterns"
            icon="📊"
          />
        </div>
      </main>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div className="p-6 transition-all border rounded-lg shadow-sm hover:shadow-md bg-card">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}