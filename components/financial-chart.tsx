"use client"

import type { Transaction } from "@/components/dashboard"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

type FinancialChartProps = {
  transactions: Transaction[]
}

export function FinancialChart({ transactions }: FinancialChartProps) {
  // Group transactions by date
  const chartData = transactions.reduce(
    (acc, transaction) => {
      const date = transaction.date
      const existing = acc.find((item) => item.date === date)

      if (existing) {
        if (transaction.type === "income") {
          existing.income += transaction.amount
        } else {
          existing.expense += transaction.amount
        }
      } else {
        acc.push({
          date,
          income: transaction.type === "income" ? transaction.amount : 0,
          expense: transaction.type === "expense" ? transaction.amount : 0,
        })
      }

      return acc
    },
    [] as Array<{ date: string; income: number; expense: number }>,
  )

  // Sort by date
  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(16, 185, 129)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="rgb(16, 185, 129)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(239, 68, 68)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="rgb(239, 68, 68)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(226, 232, 240)" />
          <XAxis dataKey="date" stroke="rgb(100, 116, 139)" fontSize={12} />
          <YAxis stroke="rgb(100, 116, 139)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(255, 255, 255)",
              border: "1px solid rgb(226, 232, 240)",
              borderRadius: "0.5rem",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="income"
            stroke="rgb(16, 185, 129)"
            fillOpacity={1}
            fill="url(#colorIncome)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="rgb(239, 68, 68)"
            fillOpacity={1}
            fill="url(#colorExpense)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
