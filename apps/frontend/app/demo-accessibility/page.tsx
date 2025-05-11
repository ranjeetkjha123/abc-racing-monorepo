"use client"

export default function DemoAccessibility() {
  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only bg-black text-white p-2 absolute top-2 left-2 z-50 rounded">
        Skip to main content
      </a>
      <header role="banner" className="bg-[#222] text-white p-4" aria-label="Site header">
        <nav role="navigation" aria-label="Main navigation">
          <ul className="flex gap-4">
            <li><a href="/" className="underline focus:outline focus:outline-2 focus:outline-red-500">Home</a></li>
            <li><a href="/races" className="underline focus:outline focus:outline-2 focus:outline-red-500">Races</a></li>
            <li><a href="/drivers" className="underline focus:outline focus:outline-2 focus:outline-red-500">Drivers</a></li>
            <li><a href="/teams" className="underline focus:outline focus:outline-2 focus:outline-red-500">Teams</a></li>
          </ul>
        </nav>
      </header>
      <main id="main-content" role="main" className="p-6 max-w-3xl mx-auto" aria-label="Main content">
        <h1 className="text-3xl font-bold mb-4">Accessibility Demo (WCAG AAA)</h1>
        <section aria-labelledby="about-heading" className="mb-8">
          <h2 id="about-heading" className="text-2xl font-semibold mb-2">About This Page</h2>
          <p className="mb-2">
            This page demonstrates AAA-level accessibility features:
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>Semantic HTML and ARIA landmarks</li>
            <li>Skip to main content link</li>
            <li>Proper heading structure</li>
            <li>High color contrast</li>
            <li>Keyboard navigation and visible focus</li>
            <li>Descriptive alt text for images</li>
            <li>Accessible forms and labels</li>
          </ul>
        </section>
        <section aria-labelledby="media-heading" className="mb-8">
          <h2 id="media-heading" className="text-2xl font-semibold mb-2">Accessible Media Example</h2>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
            alt="A racing car speeding on a track with fans in the background."
            className="rounded shadow mb-4"
            width={400}
            height={267}
          />
          <video
            controls
            poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
            width={400}
            height={225}
            preload="none"
            aria-label="Race day interview video with captions"
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <strong>Note:</strong> Videos should include captions and transcripts for full AAA compliance.
          </p>
        </section>
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="text-2xl font-semibold mb-2">Accessible Form Example</h2>
          <form className="space-y-4" aria-label="Newsletter signup form">
            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="border border-gray-400 rounded p-2 w-full focus:outline focus:outline-2 focus:outline-red-500"
                aria-required="true"
                aria-describedby="email-desc"
              />
              <span id="email-desc" className="text-xs text-gray-600 dark:text-gray-400">We'll never share your email.</span>
            </div>
            <button type="submit" className="bg-[#ef4444] text-white px-4 py-2 rounded focus:outline focus:outline-2 focus:outline-black">
              Subscribe
            </button>
          </form>
        </section>
      </main>
      <footer role="contentinfo" className="bg-[#222] text-white p-4 mt-8 text-center" aria-label="Site footer">
        &copy; {new Date().getFullYear()} ABC Racing. All rights reserved.
      </footer>
    </>
  )
}
