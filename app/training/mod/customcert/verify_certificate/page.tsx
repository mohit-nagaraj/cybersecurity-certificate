"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"

export default function VerifyCertificatePage() {
  const searchParams = useSearchParams()
  const code = searchParams.get("code") as string
  const [certificateData, setCertificateData] = useState<{
    name: string
    verified: boolean
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(`/api/certificate/retrieve?code=${code}`)
        const data = await response.json()

        setCertificateData({
          name: data.name || "Unknown",
          verified: !!data.name,
        })
      } catch (error) {
        console.error("Error fetching certificate:", error)
        setCertificateData({
          name: "Unknown",
          verified: false,
        })
      } finally {
        setLoading(false)
      }
    }

    if (code) {
      fetchCertificate()
    }
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

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-sm">
          <Link href="https://cybersecurityskills.in/training/" className="text-[#00539c] hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-600 mx-2">/</span>
          <span className="text-gray-600">Verify certificate</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">eSikshak</h1>

        <Card className="bg-white p-8 border border-gray-200 shadow-sm rounded-lg">
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Full name:</p>
              <p className="text-lg text-[#00539c] font-semibold">{certificateData?.name}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Course:</p>
              <Link
                href="https://cybersecurityskills.in/training/course/view.php?id=51"
                className="text-lg text-[#00539c] font-semibold hover:underline"
              >
                Software &amp; Network Security Fundamentals(BCMP Sept25)
              </Link>
            </div>

            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Certificate:</p>
              <p className="text-lg text-gray-900">Course Completion Certificate</p>
            </div>

            {certificateData?.verified ? (
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 mt-6">
                <span className="text-green-800 font-medium">Verified</span>
              </div>
            ) : (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-6">
                <span className="text-red-800 font-medium">Not Verified</span>
              </div>
            )}

            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-200">
              <p>
                Certificate Code: <span className="font-mono font-semibold text-gray-900">{code}</span>
              </p>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
