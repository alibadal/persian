"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { ChatMessage } from "@/components/chat-message"

// Mock data for partner
const mockPartner = {
  name: "کاربر ناشناس",
  gender: "مرد",
  age: 25,
}

export default function ChatPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<
    Array<{ id: number; text: string; sender: "user" | "partner"; timestamp: Date }>
  >([
    {
      id: 1,
      text: "سلام! من اینجام تا با شما چت کنم.",
      sender: "partner",
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (message.trim()) {
      // Add user message
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user" as const,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newMessage])
      setMessage("")

      // Simulate partner response after a short delay
      setTimeout(
        () => {
          const responses = [
            "چه جالب!",
            "بله، موافقم.",
            "نظر شما چیه؟",
            "من تجربه متفاوتی داشتم.",
            "میشه بیشتر توضیح بدی؟",
          ]

          const partnerMessage = {
            id: messages.length + 2,
            text: responses[Math.floor(Math.random() * responses.length)],
            sender: "partner" as const,
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, partnerMessage])
        },
        1000 + Math.random() * 2000,
      )
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleNextPartner = () => {
    router.push("/waiting-room")
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-2xl h-screen py-12 flex flex-col">
        <Card className="flex-1 flex flex-col shadow-lg">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl">{mockPartner.name}</span>
                <span className="text-base text-muted-foreground mr-2">({mockPartner.age} سال)</span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex w-full space-x-2 space-x-reverse">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 text-base py-6"
              />
              <Button
                type="submit"
                size="icon"
                className="h-14 w-14 bg-primary hover:bg-primary/90"
                disabled={!message.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>

        <Button
          onClick={handleNextPartner}
          className="mt-6 w-full text-lg h-14 bg-gradient-to-l from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
        >
          بعدی
        </Button>
      </div>
    </main>
  )
}
