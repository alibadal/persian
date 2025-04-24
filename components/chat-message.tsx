import { cn } from "@/lib/utils"

type Message = {
  id: number
  text: string
  sender: "user" | "partner"
  timestamp: Date
}

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.sender === "user"
  const time = message.timestamp.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3 shadow-md",
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
        )}
      >
        <p className="break-words text-base">{message.text}</p>
        <p className={cn("text-xs mt-1", isUser ? "text-primary-foreground/70" : "text-secondary-foreground/70")}>
          {time}
        </p>
      </div>
    </div>
  )
}
