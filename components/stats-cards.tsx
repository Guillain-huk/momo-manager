import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react"

interface StatsCardsProps {
  totalIncome: number
  totalExpense: number
  balance: number
}

export function StatsCards({ totalIncome, totalExpense, balance }: StatsCardsProps) {
  // Deterministic formatter (same output on server & client)
  const formatCurrency = (amount: number) => {
    const rounded = Math.round(amount)
    const withSeparators = String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `RWF ${withSeparators}`
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/30 dark:border-purple-800 border-l-4 border-l-purple-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-purple-500 dark:text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">
            {formatCurrency(balance)}
          </div>
        </CardContent>
      </Card>

      {/* Income Card */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/30 dark:border-green-800 border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Total Income</CardTitle>
          <ArrowDownCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-green-300">
            {formatCurrency(totalIncome)}
          </div>
        </CardContent>
      </Card>

      {/* Expense Card */}
      <Card className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/40 dark:to-rose-900/30 dark:border-rose-800 border-l-4 border-l-rose-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-rose-900 dark:text-rose-100">Total Expenses</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-rose-500 dark:text-rose-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-300">
            {formatCurrency(totalExpense)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
