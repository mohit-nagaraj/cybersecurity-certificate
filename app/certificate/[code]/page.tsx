"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"
import { nameIdStore } from "@/lib/store"

export default function CertificatePage() {
  const params = useParams()
  const code = params.code as string
  const [certificateData, setCertificateData] = useState<{
    name: string
    verified: boolean
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const name = nameIdStore.get(code)
    setCertificateData({
      name: name || "Unknown",
      verified: !!name,
    })
    setLoading(false)
  }, [code])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading certificate...</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">eSikshak</h1>

        <Card className="bg-white p-8 border border-gray-200 shadow-sm">
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 text-sm font-medium">Full name:</p>
              <p className="text-lg font-semibold text-blue-600">{certificateData?.name}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm font-medium">Course:</p>
              <p className="text-lg font-semibold text-blue-600">
                Software &amp; Network Security Fundamentals(BCMP Sept25)
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm font-medium">Certificate:</p>
              <p className="text-lg font-semibold">Course Completion Certificate</p>
            </div>

            {certificateData?.verified ? (
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-green-800 font-medium">Verified</span>
              </div>
            ) : (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <span className="text-red-800 font-medium">Not Verified</span>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded text-sm text-gray-600">
            <p>
              Certificate Code: <span className="font-mono font-semibold">{code}</span>
            </p>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
