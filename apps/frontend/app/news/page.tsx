import NewsSection from "@/components/news-section"

export default function DemoNewsPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">News Section Demo</h1>
      <p className="mb-6 text-muted-foreground">
        This page demonstrates the NewsSection component, which is designed to degrade gracefully and remain accessible even in older browsers or with JavaScript/CSS disabled.
      </p>
      <NewsSection />
      <noscript>
        <div style={{ color: 'red', padding: '1em', background: '#fffbe6', marginTop: '2em' }}>
          This site works best with JavaScript enabled. For older browsers, content is shown in a simplified format.
        </div>
      </noscript>
    </main>
  )
}
