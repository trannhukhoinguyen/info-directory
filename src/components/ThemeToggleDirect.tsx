"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggleDirect() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    // Nếu đang light thì sang dark, ngược lại sang light
    // Bạn có thể thêm 'system' vào vòng lặp nếu muốn
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
      <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={toggleTheme}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
  )
}
