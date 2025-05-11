"use client"

import Image from "next/image"

export default function DemoMedia() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Media Optimization Demo</h1>
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Optimized Responsive Image</h2>
        <p className="mb-4 text-muted-foreground">
          This image uses <code>next/image</code> for automatic resizing, modern formats, and lazy loading.
          Use modern formats (WebP/AVIF for images, MP4/H.265 for video).
        </p>
        <div className="w-full max-w-md mx-auto">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
            alt="Race Day"
            width={800}
            height={533}
            sizes="(max-width: 600px) 100vw, 600px"
            className="rounded shadow"
            priority={false} // lazy by default
          />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Optimized Video (with poster, controls, and lazy loading)</h2>
        <p className="mb-4 text-muted-foreground">
          This video uses a poster image, controls, and does not preload to save bandwidth. For production, use adaptive streaming (HLS/DASH) and serve multiple resolutions.
        </p>
        <div className="w-full max-w-md mx-auto">
          <video
            controls
            poster="https://www.w3schools.com/html/mov_bbb.mp4"
            width={800}
            height={450}
            preload="none"
            style={{ width: "100%", height: "auto" }}
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            {/* <source src="/sample-race.webm" type="video/webm" /> */}
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  )
}
