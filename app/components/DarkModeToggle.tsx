import type React from "react"
import { Moon, Sun } from "lucide-react"

interface DarkModeToggleProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-600">
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

export default DarkModeToggle
