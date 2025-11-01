"use client"
import { useSession } from "next-auth/react"
import { Dashboard } from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Wallet, ArrowRight, Shield, ChartBar, Settings } from "lucide-react"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    return <Dashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-bold">Money Manager</span>
          </div>
          <Button onClick={() => router.push("/auth/signin")} variant="default">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl font-bold tracking-tight">
              Take Control of Your{" "}
              <span className="text-amber-500">Financial Future</span>
            </h1>
            <p className="text-xl text-gray-600">
              Track expenses, set budgets, and achieve your financial goals with our
              simple yet powerful money management tools.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => router.push("/auth/register")}
                className="gap-2"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-white shadow-sm">
              <Shield className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure Tracking</h3>
              <p className="text-gray-600">
                Keep your financial data safe and secure while tracking every
                transaction.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-white shadow-sm">
              <ChartBar className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Analytics</h3>
              <p className="text-gray-600">
                Get insights into your spending patterns and make informed
                decisions.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-white shadow-sm">
              <Settings className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Easy Budgeting</h3>
              <p className="text-gray-600">
                Set up budgets and track your progress with our intuitive tools.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Money Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
