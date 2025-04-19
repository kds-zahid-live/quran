import type React from "react"
import { Bookmark } from "lucide-react"

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

interface VerseDisplayProps {
  selectedSurah: number | null
  verses: { [key: string]: Verse[] }
  bookmarks: string[]
  toggleBookmark: (verseKey: string) => void
  searchTerm: string
  selectedLanguage: "english" | "bangla" | "hindi" | "urdu"
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({
  selectedSurah,
  verses,
  bookmarks,
  toggleBookmark,
  searchTerm,
  selectedLanguage,
}) => {
  if (!selectedSurah) {
    return (
      <div className="w-full md:w-2/3">
        <h2 className="text-xl font-semibold mb-4">Verses</h2>
        <p className="text-gray-500 dark:text-gray-400">Please select a surah to view its verses.</p>
      </div>
    )
  }

  const surahVerses = verses[selectedSurah.toString()] || []
  const filteredVerses = surahVerses.filter(
    (verse) =>
      verse.translations[selectedLanguage].toLowerCase().includes(searchTerm.toLowerCase()) ||
      verse.text.includes(searchTerm),
  )

  return (
    <div className="w-full md:w-2/3">
      <h2 className="text-xl font-semibold mb-4">Verses of Surah {selectedSurah}</h2>
      <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-600 max-h-96 overflow-y-auto">
          {filteredVerses.map((verse) => (
            <li key={verse.number} className="px-4 py-3 relative">
              <div className="font-medium flex justify-between items-center">
                <span>{verse.number}.</span>
                <button
                  onClick={() => toggleBookmark(`${selectedSurah}:${verse.number}`)}
                  className="text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400"
                >
                  <Bookmark
                    className={`w-5 h-5 ${bookmarks.includes(`${selectedSurah}:${verse.number}`) ? "fill-current text-yellow-500 dark:text-yellow-400" : ""}`}
                  />
                </button>
              </div>
              <div className="text-right mb-2">{verse.text}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{verse.translations[selectedLanguage]}</div>
              <button
                onClick={() => {
                  // Simulate audio playback
                  alert(`Playing audio for verse ${verse.number} of Surah ${selectedSurah}`)
                }}
                className="mt-2 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Play Audio
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default VerseDisplay

