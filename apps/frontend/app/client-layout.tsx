"use client"
import type React from "react"
import { Suspense, useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import OfflineIndicator from "@/components/offline-indicator"
import { useRouter, usePathname } from "next/navigation"

import { onCLS, onFID, onLCP, onFCP, onTTFB } from "web-vitals"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    // Update HTML lang attribute whenever locale changes
    const locale = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1] || 'en';
    
    setCurrentLocale(locale);
    document.documentElement.lang = locale;

    // Service worker registration
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration)
          })
          .catch((error) => {
            console.error("SW registration failed: ", error)
          })
      })
    }

    // Offline redirect logic
    function handleOffline() {
      if (pathname !== "/offline") {
        router.push("/offline")
      }
    }
    if (!navigator.onLine && pathname !== "/offline") {
      router.push("/offline")
    }
    window.addEventListener("offline", handleOffline)
    onCLS(console.log)
    onFID(console.log)
    onLCP(console.log)
    onFCP(console.log)
    onTTFB(console.log)
    return () => {
      window.removeEventListener("offline", handleOffline)
    }

   
  }, [pathname, router])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<div className="container mx-auto p-4">Loading...</div>}>{children}</Suspense>
        </main>
        <Footer />
        <OfflineIndicator />
      </div>
    </ThemeProvider>
  )
}
