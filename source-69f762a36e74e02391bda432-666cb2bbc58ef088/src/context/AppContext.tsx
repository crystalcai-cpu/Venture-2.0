import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Listing } from '@/data/listings'
import { baseListings } from '@/data/listings'

export interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

interface AppState {
  // Listings
  listings: Listing[]
  setListings: (listings: Listing[]) => void

  // Favorites
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean

  // Comparison Queue
  compareQueue: string[]
  toggleCompare: (id: string) => void
  inCompareQueue: (id: string) => boolean
  clearCompare: () => void

  // Auth
  currentUser: User | null
  login: (email: string, password: string) => { success: boolean; error?: string }
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
}

const AppContext = createContext<AppState | null>(null)

const ADMIN_EMAIL = 'admin@duylegacyventures.com'
const ADMIN_PASSWORD = 'DuyLegacy2025!'

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [listings, setListingsState] = useState<Listing[]>(baseListings)
  const [favorites, setFavorites] = useState<string[]>([])
  const [compareQueue, setCompareQueue] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Hydrate from localStorage on mount
  useEffect(() => {
    setFavorites(loadFromStorage('rentopia_favorites', []))
    setCompareQueue(loadFromStorage('rentopia_compare', []))
    setCurrentUser(loadFromStorage('rentopia_user', null))
    const savedListings = loadFromStorage<Listing[] | null>('rentopia_listings', null)
    if (savedListings && savedListings.length > 0) {
      setListingsState(savedListings)
    }
  }, [])

  const setListings = (next: Listing[]) => {
    setListingsState(next)
    saveToStorage('rentopia_listings', next)
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      saveToStorage('rentopia_favorites', next)
      return next
    })
  }

  const toggleCompare = (id: string) => {
    setCompareQueue(prev => {
      if (prev.includes(id)) {
        const next = prev.filter(x => x !== id)
        saveToStorage('rentopia_compare', next)
        return next
      }
      if (prev.length >= 3) return prev
      const next = [...prev, id]
      saveToStorage('rentopia_compare', next)
      return next
    })
  }

  const clearCompare = () => {
    setCompareQueue([])
    saveToStorage('rentopia_compare', [])
  }

  const login = (email: string, password: string) => {
    // Check admin credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user: User = { id: 'admin', name: 'Duy Legacy Admin', email, isAdmin: true }
      setCurrentUser(user)
      saveToStorage('rentopia_user', user)
      return { success: true }
    }
    // Check registered users
    const users = loadFromStorage<{ email: string; password: string; name: string; id: string }[]>('rentopia_users', [])
    const found = users.find(u => u.email === email && u.password === password)
    if (found) {
      const user: User = { id: found.id, name: found.name, email: found.email, isAdmin: false }
      setCurrentUser(user)
      saveToStorage('rentopia_user', user)
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password.' }
  }

  const signup = (name: string, email: string, password: string) => {
    const users = loadFromStorage<{ email: string; password: string; name: string; id: string }[]>('rentopia_users', [])
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists.' }
    }
    const newUser = { id: `user_${Date.now()}`, name, email, password }
    users.push(newUser)
    saveToStorage('rentopia_users', users)
    const user: User = { id: newUser.id, name, email, isAdmin: false }
    setCurrentUser(user)
    saveToStorage('rentopia_user', user)
    return { success: true }
  }

  const logout = () => {
    setCurrentUser(null)
    if (typeof window !== 'undefined') localStorage.removeItem('rentopia_user')
  }

  return (
    <AppContext.Provider value={{
      listings, setListings,
      favorites, toggleFavorite, isFavorite: (id) => favorites.includes(id),
      compareQueue, toggleCompare, inCompareQueue: (id) => compareQueue.includes(id), clearCompare,
      currentUser, login, signup, logout
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
