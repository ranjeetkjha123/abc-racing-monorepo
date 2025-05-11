import { NextResponse } from "next/server"

// This API route provides a list of assets that should be available offline
export async function GET() {
  // In a real app, this would be dynamically generated based on user preferences
  const offlineAssets = {
    routes: ["/", "/offline", "/races", "/drivers", "/teams"],
    images: ["/placeholder.svg", "/icons/icon-192x192.png", "/icons/icon-512x512.png"],
    // Add other asset types as needed
  }

  return NextResponse.json(offlineAssets)
}
