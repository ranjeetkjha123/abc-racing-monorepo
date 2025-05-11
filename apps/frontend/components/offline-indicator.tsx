"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    // Set initial state based on navigator.onLine
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setShowAlert(true)

      // Hide the alert after 3 seconds
      setTimeout(() => setShowAlert(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowAlert(true)
    }

    // Add event listeners
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Initial check to show alert if offline
    if (!navigator.onLine) {
      setShowAlert(true)
    }

    // Clean up event listeners
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!showAlert) return null

  return (
    <Alert
      className={cn(
        "fixed bottom-4 right-4 max-w-xs transition-opacity duration-300 z-50",
        showAlert ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      variant={isOnline ? "default" : "destructive"}
    >
      {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
      <AlertTitle>{isOnline ? "You're back online" : "You're offline"}</AlertTitle>
      <AlertDescription>
        {isOnline
          ? "Your connection has been restored. All features are now available."
          : "Some features may be limited. We'll save your progress for when you're back online."}
      </AlertDescription>
    </Alert>
  )
}
