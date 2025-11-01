import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

type TxRow = {
  id: string
  type: string
  category: string
  amount: number
  description?: string | null
  date: Date | string
  createdAt: Date
  userId?: string | null
}

export async function GET() {
  const transactions = (await prisma.transaction.findMany({
    orderBy: { createdAt: "desc" },
  })) as TxRow[]

  const mapped = transactions.map((t) => {
    const dateStr =
      t.date instanceof Date ? t.date.toISOString().split("T")[0] : String(t.date)
    return {
      ...t,
      date: dateStr,
    }
  })

  return NextResponse.json(mapped)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.type || !body.category || body.amount == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const created = await prisma.transaction.create({
      data: {
        type: String(body.type),
        category: String(body.category),
        amount: Math.round(Number(body.amount)),
        description: body.description ?? null,
        date: body.date ? new Date(body.date) : new Date(),
        userId: body.userId ?? null,
      },
    })
    const mapped = {
      ...created,
      date: created.date instanceof Date ? created.date.toISOString().split("T")[0] : created.date,
    }
    return NextResponse.json(mapped, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url)
    let id = url.searchParams.get("id")
    if (!id) {
      try {
        const body = await req.json()
        id = body?.id
      } catch {
        // ignore
      }
    }
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
    await prisma.transaction.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 })
  }
}