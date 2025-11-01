import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"

type StatsCardsProps = {
  totalIncome: number
  totalExpense: number
  balance: number
}

export function StatsCards({ totalIncome, totalExpense, balance }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">${totalIncome.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">All time earnings</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">${totalExpense.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">All time spending</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${balance >= 0 ? "text-accent" : "text-destructive"}`}>
            ${balance.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Current balance</p>
        </CardContent>
      </Card>
    </div>
  )
}
