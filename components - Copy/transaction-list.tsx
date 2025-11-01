"use client"

import type { Transaction } from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import { Trash2, TrendingUp, TrendingDown } from "lucide-react"

type TransactionListProps = {
  transactions: Transaction[]
  onDelete: (id: string) => void
  compact?: boolean
}

export function TransactionList({ transactions, onDelete, compact = false }: TransactionListProps) {
  if (transactions.length === 0) {
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
          className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-secondary/50"
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                transaction.type === "income" ? "bg-accent/10" : "bg-destructive/10"
              }`}
            >
              {transaction.type === "income" ? (
                <TrendingUp className="h-5 w-5 text-accent" />
              ) : (
                <TrendingDown className="h-5 w-5 text-destructive" />
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">{transaction.category}</p>
              <p className="text-sm text-muted-foreground">{transaction.description}</p>
              {!compact && <p className="text-xs text-muted-foreground mt-1">{transaction.date}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p
              className={`text-lg font-semibold ${transaction.type === "income" ? "text-accent" : "text-destructive"}`}
            >
              {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
            </p>
            {!compact && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(transaction.id)}
                className="text-muted-foreground hover:text-destructive"
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
