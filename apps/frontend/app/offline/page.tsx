"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WifiOff } from "lucide-react"
import { useEffect, useState } from "react"

export default function OfflinePage() {
  const [routes, setRoutes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    fetch(`${apiUrl}/api/offline-assets`)
      .then((res) => res.json())
      .then((data) => {
        setRoutes(data.routes || [])
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <WifiOff className="h-16 w-16 mb-6 text-muted-foreground" />
      <h1 className="text-3xl font-bold mb-4">You're Offline</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        It looks like you've lost your internet connection. Some features may be limited until you're back online.
      </p>
      <div className="space-y-4">
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
        <div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Available Offline</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Failed to load offline routes.</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 max-w-2xl">
            {routes.map((route) => (
              <Link key={route} href={route} className="p-4 border rounded-lg hover:bg-muted">
                {route === "/" ? "Homepage" : route.replace("/", "").replace(/\b\w/g, c => c.toUpperCase())}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
