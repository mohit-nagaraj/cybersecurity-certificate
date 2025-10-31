"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

import QRCode from "qrcode"

function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 10)
}

export default function HomePage() {
  const [name, setName] = useState("")
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [certificateCode, setCertificateCode] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateQR = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      alert("Please enter a name")
      return
    }

    setIsLoading(true)

    const uniqueId = generateUniqueId()

    try {
      const response = await fetch("/api/certificate/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: uniqueId, name: name }),
      })

      if (!response.ok) {
        throw new Error("Failed to store certificate")
      }
    } catch (error) {
      console.error("Error storing certificate:", error)
      alert("Failed to store certificate")
      setIsLoading(false)
      return
    }

    const qrUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/training/mod/customcert/verify_certificate?code=${uniqueId}&qrcode=1`

    try {
      const dataUrl = await QRCode.toDataURL(qrUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
      setQrDataUrl(dataUrl)
    } catch (err) {
      console.error("Error generating QR code:", err)
    }

    setCertificateCode(uniqueId)
    setSubmitted(true)
    setIsLoading(false)
  }

  const handleDownloadQR = () => {
    if (qrDataUrl) {
      const link = document.createElement("a")
      link.href = qrDataUrl
      link.download = `${name}-certificate-qr.png`
      link.click()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">eSikshak</h1>
          <p className="text-gray-600">Certificate QR Code Generator</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="p-8 border border-gray-200 shadow-sm rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Generate Certificate QR</h2>

            <form onSubmit={handleGenerateQR} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full"
                  disabled={submitted || isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00539c] hover:bg-[#003d73] text-white"
                disabled={submitted || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </div>
                ) : (
                  "Generate QR Code"
                )}
              </Button>

              {submitted && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setName("")
                    setQrDataUrl("")
                    setCertificateCode("")
                    setSubmitted(false)
                  }}
                  className="w-full"
                  disabled={isLoading}
                >
                  Generate Another
                </Button>
              )}
            </form>
          </Card>

          {/* QR Code Section */}
          <Card className="p-8 border border-gray-200 shadow-sm rounded-lg flex flex-col items-center justify-center">
            {submitted ? (
              <div className="text-center w-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Certificate QR Code</h3>
                <div className="flex justify-center mb-6 p-4 bg-white rounded-lg border border-gray-200">
                  {qrDataUrl && (
                    <img src={qrDataUrl || "/placeholder.svg"} alt="Certificate QR Code" className="w-64 h-64" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Certificate Code: <span className="font-mono font-semibold text-[#00539c]">{certificateCode}</span>
                </p>
                <p className="text-xs text-gray-500 mb-6">Scan this QR code to verify the certificate</p>
                <Button onClick={handleDownloadQR} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Download QR Code
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-lg">QR code will appear here</p>
                <p className="text-sm mt-2">Enter your name and click &quot;Generate QR Code&quot;</p>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
