import fs from "fs"
import path from "path"

const nameIdStore: Map<string, string> = new Map()

const DATA_FILE = path.join(process.cwd(), ".data", "certificates.json")

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ a1b2c3d4: "Sample User" }))
  }
}

export function storeName(code: string, name: string): void {
  try {
    ensureDataFile()
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"))
    data[code] = name
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("Error storing certificate:", error)
  }
}

export function getName(code: string): string | undefined {
  try {
    ensureDataFile()
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"))
    return data[code]
  } catch (error) {
    console.error("Error retrieving certificate:", error)
    return undefined
  }
}

export function initializeStore(): void {
  ensureDataFile()
}

export { nameIdStore }
