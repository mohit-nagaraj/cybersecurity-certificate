export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="w-full px-4 py-8 max-w-6xl mx-auto border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <Link href="#" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <span>© 2025 eSikshak. All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}

import Link from "next/link"
