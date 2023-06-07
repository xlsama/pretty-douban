declare global {
  interface Window {
    cookieStore: CookieStore
  }
}

interface CookieStore {
  get: (name: string) => Promise<CookieListItem | null>
  getAll: (name: string) => Promise<CookieListItem[]>
  set: (name: string, value: string, options?: CookieStoreSetOptions) => Promise<void>
  delete: (name: string) => Promise<void>
}

interface CookieListItem {
  domain: string
  expires: number
  name: string
  path: string
  sameSite: 'strict' | 'lax' | 'none'
  secure: boolean
  value: string
}

interface CookieStoreSetOptions {
  domain?: string
  expires?: number
  path?: string
  sameSite?: 'strict' | 'lax' | 'none'
  secure?: boolean
}
