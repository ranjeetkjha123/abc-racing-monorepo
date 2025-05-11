import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import ClientLayout from "./client-layout"
import Script from "next/script"
import { cookies } from 'next/headers'
import { headers } from 'next/headers'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ABC Racing - Official Website",
  description: "The official website for ABC Racing - Get the latest news, race schedules, driver profiles, and more.",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.variable} suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>
      </body>
    </html>
  )
}

import './globals.css'