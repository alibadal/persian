"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function WaitingRoomPage() {
  const router = useRouter()

  useEffect(() => {
    // Simulate finding a match after 3-5 seconds
    const timeout = setTimeout(
      () => {
        router.push("/chat")
      },
      3000 + Math.random() * 2000,
    )

    return () => clearTimeout(timeout)
  }, [router])

  const handleCancel = () => {
    router.push("/preferences")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">اتاق انتظار</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-8">
            <Loader2 className="h-20 w-20 animate-spin text-primary" />
            <p className="text-center text-xl">در حال یافتن فرد مناسب برای چت...</p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="w-full text-lg h-14 border-2 hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-300"
            >
              لغو
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
