"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import LanguageSelector from "@/app/components/LanguageSelector"

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

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
}

export default function SurahPage() {
  const params = useParams()
  const surahId = params.id as string

  const [surah, setSurah] = useState<Surah | null>(null)
  const [verses, setVerses] = useState<Verse[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "bangla" | "hindi" | "urdu">("english")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/quran")
        const data = await response.json()

        const surahData = data.surahs.find((s: Surah) => s.number.toString() === surahId)
        const versesData = data.verses[surahId] || []

        setSurah(surahData)
        setVerses(versesData)
      } catch (error) {
        console.error("Error fetching surah data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [surahId])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!surah) {
    return <div className="flex justify-center items-center min-h-screen">Surah not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <Link href="/" className="flex items-center text-blue-500 hover:text-blue-700">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>
        <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">{surah.englishName}</h1>
        <h2 className="text-3xl mb-2 font-arabic">{surah.name}</h2>
        <p className="text-xl text-gray-600">{surah.englishNameTranslation}</p>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {verses.map((verse) => (
          <div key={verse.number} className="p-6 border-b border-gray-200 last:border-b-0">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-gray-100 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
                {verse.number}
              </span>
            </div>

            <div className="text-right mb-6">
              <p className="text-2xl leading-loose font-arabic">{verse.text}</p>
            </div>

            <div className="text-gray-700">
              <p className="text-lg leading-relaxed">{verse.translations[selectedLanguage]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
