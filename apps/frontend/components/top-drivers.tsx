import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would normally come from an API
const topDrivers = [
  {
    id: 1,
    name: "Max Johnson",
    team: "Red Racing",
    points: 156,
    position: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Lewis Hamilton",
    team: "Silver Arrows",
    points: 143,
    position: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Charles Leclerc",
    team: "Scuderia Red",
    points: 138,
    position: 3,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Lando Norris",
    team: "Papaya Racing",
    points: 121,
    position: 4,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Fernando Alonso",
    team: "Green Machine",
    points: 98,
    position: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function TopDrivers() {
  return (
    <div className="space-y-4">
      {topDrivers.map((driver) => (
        <Link key={driver.id} href={`/drivers/${driver.id}`} className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border">
                <Image
                  src={driver.image || "/placeholder.svg"}
                  alt={driver.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium">{driver.name}</div>
                <div className="text-sm text-muted-foreground">{driver.team}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={driver.position <= 3 ? "default" : "outline"}>{driver.position}</Badge>
                <div className="font-bold">{driver.points} pts</div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
      <div className="text-center">
        <Link href="/standings" className="text-primary hover:underline text-sm">
          View Full Standings
        </Link>
      </div>
    </div>
  )
}
