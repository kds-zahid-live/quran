import type React from "react"

interface LanguageSelectorProps {
  selectedLanguage: string
  onLanguageChange: (language: "english" | "bangla" | "hindi" | "urdu") => void
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onLanguageChange(e.target.value as "english" | "bangla" | "hindi" | "urdu")}
      className="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      <option value="english">English</option>
      <option value="bangla">বাংলা</option>
      <option value="hindi">हिंदी</option>
      <option value="urdu">اردو</option>
    </select>
  )
}

export default LanguageSelector

