import Image from "next/image"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

// This would normally come from an API
const newsArticles = [
  {
    id: 1,
    title: "Johnson Takes Pole Position in Season Opener",
    excerpt: "Max Johnson secures pole position with a record-breaking lap time in qualifying.",
    category: "Qualifying",
    date: new Date(2025, 4, 9, 16, 30),
    image: "/placeholder.svg?height=400&width=600",
    slug: "johnson-takes-pole",
  },
  {
    id: 2,
    title: "New Safety Measures Announced for 2025 Season",
    excerpt: "The racing commission has announced new safety protocols to be implemented this season.",
    category: "News",
    date: new Date(2025, 4, 8, 10, 15),
    image: "/placeholder.svg?height=400&width=600",
    slug: "new-safety-measures",
  },
  {
    id: 3,
    title: "Team Spotlight: Inside the Red Racing Garage",
    excerpt: "An exclusive look at how the championship-winning team prepares for race day.",
    category: "Feature",
    date: new Date(2025, 4, 7, 14, 45),
    image: "/placeholder.svg?height=400&width=600",
    slug: "team-spotlight-red-racing",
  },
]

export default function NewsSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsArticles.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{article.category}</Badge>
              <time dateTime={article.date.toISOString()} className="text-xs text-muted-foreground">
                {formatDistanceToNow(article.date, { addSuffix: true })}
              </time>
            </div>
            <CardTitle className="line-clamp-2">{article.title}</CardTitle>
            <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={`/news/${article.slug}`} className="text-primary hover:underline text-sm">
              Read More
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
