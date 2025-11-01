import type { MonthlyPlan } from "@/components/dashboard"
import { Progress } from "@/components/ui/progress"

type MonthlyBudgetProps = {
  plans: MonthlyPlan[]
}

export function MonthlyBudget({ plans }: MonthlyBudgetProps) {
  if (plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No budget plans yet</p>
        <p className="text-sm text-muted-foreground">Create your first monthly budget</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {plans.map((plan, index) => {
        const savings = plan.income - plan.expense
        const savingsRate = (savings / plan.income) * 100
        const expenseRate = (plan.expense / plan.income) * 100

        return (
          <div key={index} className="space-y-4 rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{plan.month}</h3>
              <div className={`text-sm font-medium ${savings >= 0 ? "text-accent" : "text-destructive"}`}>
                {savings >= 0 ? "Surplus" : "Deficit"}: ${Math.abs(savings).toFixed(2)}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Income</span>
                  <span className="font-medium text-foreground">${plan.income.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expense</span>
                  <span className="font-medium text-foreground">${plan.expense.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expense Rate</span>
                  <span className="font-medium text-foreground">{expenseRate.toFixed(1)}%</span>
                </div>
                <Progress value={expenseRate} className="h-2" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
