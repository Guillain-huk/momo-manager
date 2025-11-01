import type { Transaction } from "@/components/dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react"

type FinancialAdviceProps = {
  totalIncome: number
  totalExpense: number
  transactions: Transaction[]
}

export function FinancialAdvice({ totalIncome, totalExpense, transactions }: FinancialAdviceProps) {
  const balance = totalIncome - totalExpense
  const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0

  // Calculate category spending
  const categorySpending = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const topCategory = Object.entries(categorySpending).sort(([, a], [, b]) => b - a)[0]

  const getAdvice = () => {
    const advice = []

    if (balance < 0) {
      advice.push({
        type: "warning",
        icon: AlertTriangle,
        message: "Your expenses exceed your income. Consider reducing spending or finding additional income sources.",
      })
    } else if (savingsRate < 20) {
      advice.push({
        type: "info",
        icon: Lightbulb,
        message: `You're saving ${savingsRate.toFixed(1)}% of your income. Financial experts recommend saving at least 20%.`,
      })
    } else {
      advice.push({
        type: "success",
        icon: CheckCircle2,
        message: `Great job! You're saving ${savingsRate.toFixed(1)}% of your income, which is above the recommended 20%.`,
      })
    }

    if (topCategory && totalExpense > 0) {
      const topCategoryPercentage = (topCategory[1] / totalExpense) * 100
      if (topCategoryPercentage > 40) {
        advice.push({
          type: "warning",
          icon: AlertTriangle,
          message: `${topCategory[0]} accounts for ${topCategoryPercentage.toFixed(1)}% of your expenses. Consider if this is sustainable.`,
        })
      }
    }

    if (transactions.length < 5) {
      advice.push({
        type: "info",
        icon: Lightbulb,
        message: "Track more transactions to get better insights into your spending patterns.",
      })
    }

    return advice
  }

  const advice = getAdvice()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {advice.map((item, index) => {
          const Icon = item.icon
          return (
            <Alert
              key={index}
              variant={item.type === "warning" ? "destructive" : "default"}
              className={
                item.type === "success"
                  ? "border-accent bg-accent/5"
                  : item.type === "info"
                    ? "border-primary bg-primary/5"
                    : ""
              }
            >
              <Icon
                className={`h-4 w-4 ${
                  item.type === "success" ? "text-accent" : item.type === "info" ? "text-primary" : ""
                }`}
              />
              <AlertDescription className="text-sm">{item.message}</AlertDescription>
            </Alert>
          )
        })}
      </CardContent>
    </Card>
  )
}
