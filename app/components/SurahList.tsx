"use client"

import type React from "react"
import Link from "next/link"

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
}

interface SurahListProps {
  surahs: Surah[]
  onSelectSurah: (surahNumber: number) => void
  searchTerm: string
}

const SurahList: React.FC<SurahListProps> = ({ surahs, onSelectSurah, searchTerm }) => {
  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.englishNameTranslation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-full md:w-1/3">
      <h2 className="text-xl font-semibold mb-4">Surahs</h2>
      <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-600 max-h-96 overflow-y-auto">
          {filteredSurahs.map((surah) => (
            <li key={surah.number} className="hover:bg-gray-50 dark:hover:bg-gray-600">
              <div className="flex justify-between items-center px-4 py-3">
                <button onClick={() => onSelectSurah(surah.number)} className="text-left flex-grow">
                  <span className="font-medium">{surah.englishName}</span>
                  <span className="text-gray-500 dark:text-gray-300 ml-2">({surah.name})</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{surah.englishNameTranslation}</p>
                </button>
                <Link href={`/surah/${surah.number}`} className="text-blue-500 hover:text-blue-700 text-sm">
                  Full View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SurahList
