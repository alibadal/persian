"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function UserInfoForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState(18)
  const [nameError, setNameError] = useState("")
  const [genderError, setGenderError] = useState("")
  const [ageError, setAgeError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Reset errors
    setNameError("")
    setGenderError("")
    setAgeError("")

    // Validate inputs
    let isValid = true

    if (!name.trim()) {
      setNameError("لطفاً نام خود را وارد کنید")
      isValid = false
    }

    if (!gender) {
      setGenderError("لطفاً جنسیت خود را انتخاب کنید")
      isValid = false
    }

    if (age < 18) {
      setAgeError("شما باید حداقل 18 سال داشته باشید")
      isValid = false
    }

    if (isValid) {
      // Store user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify({ name, gender, age }))

      // Navigate to preferences page
      router.push("/preferences")
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-2xl">اطلاعات شما</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="form-group">
            <Label htmlFor="name" className="form-label self-start">
              نام
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام خود را وارد کنید"
              className="form-input w-full"
            />
            {nameError && <p className="text-sm text-destructive self-start mt-1">{nameError}</p>}
          </div>

          <div className="form-group">
            <Label htmlFor="gender" className="form-label self-start">
              جنسیت
            </Label>
            <RadioGroup
              id="gender"
              value={gender}
              onValueChange={setGender}
              className="flex flex-row justify-center space-x-6 space-x-reverse w-full"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="مرد" id="male" className="h-5 w-5 text-pink-500" />
                <Label htmlFor="male" className="text-base font-medium">
                  مرد
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="زن" id="female" className="h-5 w-5 text-pink-500" />
                <Label htmlFor="female" className="text-base font-medium">
                  زن
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="سایر" id="other" className="h-5 w-5 text-pink-500" />
                <Label htmlFor="other" className="text-base font-medium">
                  سایر
                </Label>
              </div>
            </RadioGroup>
            {genderError && <p className="text-sm text-destructive self-start mt-1">{genderError}</p>}
          </div>

          <div className="form-group">
            <div className="w-full flex justify-between items-center">
              <Label htmlFor="age" className="form-label">
                سن
              </Label>
              <span className="text-lg font-bold text-primary">{age} سال</span>
            </div>
            <div className="w-full px-1 py-4">
              <Slider
                id="age"
                min={1}
                max={100}
                step={1}
                value={[age]}
                onValueChange={(value) => setAge(value[0])}
                className="slider-track"
              />
            </div>
            {ageError && (
              <Alert variant="destructive" className="mt-2 w-full">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription className="text-base">{ageError}</AlertDescription>
              </Alert>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          onClick={handleSubmit}
          className="w-full text-lg h-14 bg-gradient-to-l from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
          disabled={age < 18}
        >
          ادامه
        </Button>
      </CardFooter>
    </Card>
  )
}
