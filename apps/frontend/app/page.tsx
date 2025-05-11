import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import HeroSection from "@/components/hero-section"
import UpcomingRaces from "@/components/upcoming-races"
import TopDrivers from "@/components/top-drivers"
import NewsSection from "@/components/news-section"

export default function Page() {
  // const t = useTranslations();
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* <LanguageSwitcher /> */}
      <HeroSection />

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight mb-6"></h2>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming Races</TabsTrigger>
            <TabsTrigger value="standings">Standings</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-6">
            <Suspense fallback={<RacesSkeleton />}>
              <UpcomingRaces />
            </Suspense>
          </TabsContent>
          <TabsContent value="standings" className="mt-6">
            <Suspense fallback={<DriversSkeleton />}>
              <TopDrivers />
            </Suspense>
          </TabsContent>
          <TabsContent value="results" className="mt-6">
            <div className="text-center p-8">
              <p>Race results will appear here after the next race.</p>
              <Button variant="outline" className="mt-4">
                View Past Seasons
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Latest News</h2>
          <Link href="/news" className="text-primary hover:underline">
            View All News
          </Link>
        </div>
        <Suspense fallback={<NewsSkeleton />}>
          <NewsSection />
        </Suspense>
      </section>

      <section className="container mx-auto px-4 py-8 bg-muted rounded-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Download Our App</h2>
            <p className="text-muted-foreground mb-6">
              Get race alerts, live timing, and exclusive content on your mobile device. Available for offline viewing
              when you're on the go.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                  <path d="M10 2c1 .5 2 2 2 5"></path>
                </svg>
                App Store
              </Button>
              <Button variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                  <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"></path>
                  <path d="M12 7V3"></path>
                </svg>
                Google Play
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] w-full">
            <Image
              src="/placeholder.svg?height=600&width=400"
              alt="ABC Racing mobile app"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function RacesSkeleton() {
  return (
    <div className="grid gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}

function DriversSkeleton() {
  return (
    <div className="grid gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="ml-auto">
            <Skeleton className="h-6 w-[50px]" />
          </div>
        </div>
      ))}
    </div>
  )
}

function NewsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="p-0">
            <Skeleton className="h-[200px] w-full rounded-t-lg" />
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <Skeleton className="h-5 w-[80%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
