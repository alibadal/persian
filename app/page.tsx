import { UserInfoForm } from "@/components/user-info-form"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">چت ناشناس</h1>
        <UserInfoForm />
      </div>
    </main>
  )
}
