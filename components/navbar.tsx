"use client"

import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="bg-[#00539c] text-white">
      <div className="w-full px-4 py-3 flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo and Home */}
        <Link href="https://cybersecurityskills.in/training/" className="flex items-center gap-3 hover:opacity-90">
          <div className="w-12 h-12 relative">
            <Image
              src="/logo.png"
              alt="CDAC Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="text-lg font-medium">Home</span>
        </Link>

        {/* Login Button */}
        <Link
          href="https://cybersecurityskills.in/training/login/index.php"
          className="px-6 py-2 font-medium hover:bg-[#003d73] rounded transition"
        >
          Log in
        </Link>
      </div>
    </nav>
  )
}
