"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FinancialChart } from "@/components/financial-chart"
import { TransactionList } from "@/components/transaction-list"
import { StatsCards } from "@/components/stats-cards"
import { MonthlyBudget } from "@/components/monthly-budget"
import { FinancialAdvice } from "@/components/financial-advice"
import { PlusCircle, Wallet } from "lucide-react"

export type Transaction = {
  id: string
  type: "income" | "expense"
  category: string
  amount: number
  description: string
  date: string
}

export type MonthlyPlan = {
  month: string
  income: number
  expense: number
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "income",
      category: "Salary",
      amount: 5000,
      description: "Monthly salary",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "2",
      type: "expense",
      category: "Food",
      amount: 150,
      description: "Groceries",
      date: new Date().toISOString().split("T")[0],
    },
  ])

  const [monthlyPlans, setMonthlyPlans] = useState<MonthlyPlan[]>([
    { month: "January", income: 5000, expense: 3000 },
    { month: "February", income: 5200, expense: 2800 },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false)

  const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: formData.get("type") as "income" | "expense",
      category: formData.get("category") as string,
      amount: Number.parseFloat(formData.get("amount") as string),
      description: formData.get("description") as string,
      date: formData.get("date") as string,
    }

    setTransactions([newTransaction, ...transactions])
    setIsAddDialogOpen(false)
    e.currentTarget.reset()
  }

  const handleAddBudget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newPlan: MonthlyPlan = {
      month: formData.get("month") as string,
      income: Number.parseFloat(formData.get("income") as string),
      expense: Number.parseFloat(formData.get("expense") as string),
    }

    setMonthlyPlans([...monthlyPlans, newPlan])
    setIsBudgetDialogOpen(false)
    e.currentTarget.reset()
  }

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Money Manager</h1>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Transaction</DialogTitle>
                  <DialogDescription>Record your income or expense transaction</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddTransaction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select name="type" defaultValue="expense" required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input name="category" placeholder="e.g., Salary, Food, Transport" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input name="amount" type="number" step="0.01" placeholder="0.00" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input name="description" placeholder="Brief description" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input name="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} required />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Transaction
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <StatsCards totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Overview</CardTitle>
                    <CardDescription>Your income vs expenses over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FinancialChart transactions={transactions} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Latest financial activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TransactionList
                      transactions={transactions.slice(0, 5)}
                      onDelete={handleDeleteTransaction}
                      compact
                    />
                  </CardContent>
                </Card>
              </div>

              <FinancialAdvice totalIncome={totalIncome} totalExpense={totalExpense} transactions={transactions} />
            </TabsContent>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>Complete history of your financial activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="budget">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Monthly Budget Planning</CardTitle>
                    <CardDescription>Plan your income and expenses for each month</CardDescription>
                  </div>
                  <Dialog open={isBudgetDialogOpen} onOpenChange={setIsBudgetDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Add Budget
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Monthly Budget</DialogTitle>
                        <DialogDescription>Set your expected income and expenses for a month</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddBudget} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="month">Month</Label>
                          <Input name="month" placeholder="e.g., March" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="income">Expected Income</Label>
                          <Input name="income" type="number" step="0.01" placeholder="0.00" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expense">Expected Expense</Label>
                          <Input name="expense" type="number" step="0.01" placeholder="0.00" required />
                        </div>
                        <Button type="submit" className="w-full">
                          Add Budget
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <MonthlyBudget plans={monthlyPlans} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights">
              <div className="space-y-6">
                <FinancialAdvice totalIncome={totalIncome} totalExpense={totalExpense} transactions={transactions} />

                <Card>
                  <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>Breakdown of your expenses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(
                        transactions
                          .filter((t) => t.type === "expense")
                          .reduce(
                            (acc, t) => {
                              acc[t.category] = (acc[t.category] || 0) + t.amount
                              return acc
                            },
                            {} as Record<string, number>,
                          ),
                      ).map(([category, amount]) => {
                        const percentage = (amount / totalExpense) * 100
                        return (
                          <div key={category} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-foreground">{category}</span>
                              <span className="text-muted-foreground">
                                ${amount.toFixed(2)} ({percentage.toFixed(1)}%)
                              </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                              <div className="h-full bg-primary transition-all" style={{ width: `${percentage}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
