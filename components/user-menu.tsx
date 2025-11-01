"use client"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { UserCircle } from "lucide-react"

export function UserMenu() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    return (
      <Button 
        variant="outline" 
        onClick={() => router.push("/auth/signin")}
        className="gap-2"
      >
        <UserCircle className="h-5 w-5" />
        Sign In
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">
        {session.user?.name || session.user?.email}
      </span>
      <Button 
        variant="outline" 
        onClick={() => signOut()}
        className="gap-2"
      >
        <UserCircle className="h-5 w-5" />
        Sign Out
      </Button>
    </div>
  )
}