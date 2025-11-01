import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Check if user exists
    const exists = await prisma.user.findUnique({
      where: { email }
    })
    
    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password and create user
    const hashedPassword = await hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null
      }
    })

    return NextResponse.json({
      user: {
        email: user.email,
        name: user.name
      }
    })
  } catch (err) {
    console.error("Registration error:", err)
    return NextResponse.json(
      { error: "Error creating user" },
      { status: 500 }
    )
  }
}