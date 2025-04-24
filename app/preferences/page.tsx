"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ModeToggle } from "@/components/mode-toggle"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function PreferencesPage() {
  const router = useRouter()
  const [partnerGender, setPartnerGender] = useState("همه")
  const [ageRange, setAgeRange] = useState([18, 50])
  const [ageError, setAgeError] = useState("")

  // Validate age range when it changes
  useEffect(() => {
    if (ageRange[0] > ageRange[1]) {
      setAgeError("حداکثر سن باید بیشتر از حداقل سن باشد")
    } else {
      setAgeError("")
    }
  }, [ageRange])

  const handleSearch = () => {
    if (ageRange[0] > ageRange[1]) {
      return // Don't proceed if validation fails
    }

    // Store preferences in localStorage
    localStorage.setItem(
      "chatPreferences",
      JSON.stringify({
        partnerGender,
        minAge: ageRange[0],
        maxAge: ageRange[1],
      }),
    )

    router.push("/waiting-room")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">انتخاب ترجیحات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="form-group">
              <Label htmlFor="partner-gender" className="form-label self-start">
                جنسیت طرف مقابل
              </Label>
              <RadioGroup
                id="partner-gender"
                value={partnerGender}
                onValueChange={setPartnerGender}
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
                  <RadioGroupItem value="همه" id="all" className="h-5 w-5 text-pink-500" />
                  <Label htmlFor="all" className="text-base font-medium">
                    همه
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="form-group">
              <div className="w-full">
                <Label className="form-label">محدوده سنی</Label>
                <div className="flex justify-between mt-2 text-base font-medium">
                  <span>
                    حداقل سن: <span className="text-primary font-bold">{ageRange[0]}</span> سال
                  </span>
                  <span>
                    حداکثر سن: <span className="text-primary font-bold">{ageRange[1]}</span> سال
                  </span>
                </div>
              </div>
              <div className="w-full px-1 py-6">
                <Slider
                  value={ageRange}
                  min={18}
                  max={100}
                  step={1}
                  minStepsBetweenThumbs={1}
                  onValueChange={setAgeRange}
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
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSearch}
              className="w-full text-lg h-14 bg-gradient-to-l from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
              disabled={ageRange[0] > ageRange[1]}
            >
              جستجو
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
