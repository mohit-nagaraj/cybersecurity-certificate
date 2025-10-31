// Keep a simple in-memory map for backwards compatibility if needed
export const nameIdStore: Map<string, string> = new Map()

export function storeName(code: string, name: string): void {
  nameIdStore.set(code, name)
}

export function getName(code: string): string | undefined {
  return nameIdStore.get(code)
}

export function initializeStore(): void {
  // No-op for Supabase integration
}
