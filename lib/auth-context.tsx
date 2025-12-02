"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  email: string | null
  logout: () => void
  checkAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    // Check authentication on mount
    const token = localStorage.getItem("adminToken")
    const storedEmail = localStorage.getItem("adminEmail")

    if (token) {
      setIsAuthenticated(true)
      setEmail(storedEmail)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminEmail")
    setIsAuthenticated(false)
    setEmail(null)
  }

  const checkAuth = () => {
    const token = localStorage.getItem("adminToken")
    return !!token
  }

  return <AuthContext.Provider value={{ isAuthenticated, email, logout, checkAuth }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
