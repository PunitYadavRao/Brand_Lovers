import React, { createContext, useState, useCallback } from 'react'
import { authService, saveToken, saveUser, getUser, getToken } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const signup = useCallback(async (email, password, name) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.signup(email, password, name)
      const { token, user: userData } = response.data.data
      saveToken(token)
      saveUser(userData)
      setUser(userData)
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(email, password)
      const { token, user: userData } = response.data.data
      saveToken(token)
      saveUser(userData)
      setUser(userData)
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setError(null)
  }, [])

  const getProfile = useCallback(async () => {
    try {
      const response = await authService.getProfile()
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get profile')
      throw err
    }
  }, [])

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    getProfile,
    isAuthenticated: !!user,
    token: getToken()
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
