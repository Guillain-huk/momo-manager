"use client"

import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Trash2 } from "lucide-react"

type Transaction = {
  id: string
  type: "income" | "expense"
  category: string
  amount: number
  description?: string
  date: string
}

type TransactionListProps = {
  transactions: Transaction[]
  onDelete: (id: string) => void
  compact?: boolean
}

const formatCurrency = (amount: number) => {
  const rounded = Math.round(amount)
  return "RWF " + String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function TransactionList({ transactions, onDelete, compact = false }: TransactionListProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No transactions yet</p>
        <p className="text-sm text-muted-foreground">Add your first transaction to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between rounded-lg border border-border bg-white p-4 transition-colors hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                transaction.type === "income" ? "bg-emerald-100" : "bg-rose-100"
              }`}
            >
              {transaction.type === "income" ? (
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-rose-600" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{transaction.category}</p>
              <p className="text-sm text-gray-600">{transaction.description}</p>
              {!compact && <p className="text-xs text-gray-500 mt-1">{transaction.date}</p>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p
              className={`text-lg font-semibold ${
                transaction.type === "income" ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>

            {!compact && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(transaction.id)}
                className="text-gray-400 hover:text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
