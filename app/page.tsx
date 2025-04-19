"use client"

import { useState, useEffect } from "react"
import SurahList from "./components/SurahList"
import VerseDisplay from "./components/VerseDisplay"
import SearchBar from "./components/SearchBar"
import DarkModeToggle from "./components/DarkModeToggle"
import LanguageSelector from "./components/LanguageSelector"

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
}

interface Verse {
  number: number
  text: string
  translations: {
    english: string
    bangla: string
    hindi: string
    urdu: string
  }
}

interface QuranData {
  surahs: Surah[]
  verses: {
    [key: string]: Verse[]
  }
}

export default function QuranApp() {
  const [quranData, setQuranData] = useState<QuranData | null>(null)
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "bangla" | "hindi" | "urdu">("english")

  useEffect(() => {
    fetch("/api/quran")
      .then((response) => response.json())
      .then((data) => setQuranData(data))
      .catch((error) => console.error("Error fetching Quran data:", error))
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [isDarkMode])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const toggleBookmark = (verseKey: string) => {
    setBookmarks((prev) => (prev.includes(verseKey) ? prev.filter((b) => b !== verseKey) : [...prev, verseKey]))
  }

  if (!quranData) {
    return <div>Loading...</div>
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="container mx-auto px-4 py-8 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quran App</h1>
          <div className="flex items-center space-x-4">
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
          </div>
        </div>
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <SurahList surahs={quranData.surahs} onSelectSurah={setSelectedSurah} searchTerm={searchTerm} />
          <VerseDisplay
            selectedSurah={selectedSurah}
            verses={quranData.verses}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            searchTerm={searchTerm}
            selectedLanguage={selectedLanguage}
          />
        </div>
      </div>
    </div>
  )
}
