'use client'

import { useTheme } from 'next-themes'
import { Card, CardContent } from "@workspace/ui/components/card"
import { Label } from "@workspace/ui/components/label"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"
import { Laptop, Moon, Sun } from 'lucide-react'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  return (
    <RadioGroup
      defaultValue={theme ?? 'system'}
      onValueChange={(value) => setTheme(value)}
      className="grid grid-cols-3 gap-4"
    >
      <Label
        htmlFor="light"
        className="cursor-pointer [&:has([data-state=checked])>div]:border-primary"
      >
        <RadioGroupItem value="light" id="light" className="sr-only" />
        <Card>
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <Sun className="h-6 w-6" />
            <h3 className="font-semibold">Light</h3>
          </CardContent>
        </Card>
      </Label>
      <Label
        htmlFor="dark"
        className="cursor-pointer [&:has([data-state=checked])>div]:border-primary"
      >
        <RadioGroupItem value="dark" id="dark" className="sr-only" />
        <Card>
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <Moon className="h-6 w-6" />
            <h3 className="font-semibold">Dark</h3>
          </CardContent>
        </Card>
      </Label>
      <Label
        htmlFor="system"
        className="cursor-pointer [&:has([data-state=checked])>div]:border-primary"
      >
        <RadioGroupItem value="system" id="system" className="sr-only" />
        <Card>
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <Laptop className="h-6 w-6" />
            <h3 className="font-semibold">System</h3>
          </CardContent>
        </Card>
      </Label>
    </RadioGroup>
  )
}