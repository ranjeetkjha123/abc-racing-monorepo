import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

// This would normally come from an API
const upcomingRaces = [
  {
    id: 1,
    name: "Monaco Grand Prix",
    date: "May 25, 2025",
    time: "14:00 GMT",
    location: "Monte Carlo, Monaco",
    circuit: "Circuit de Monaco",
    status: "upcoming",
  },
  {
    id: 2,
    name: "Canadian Grand Prix",
    date: "June 8, 2025",
    time: "19:00 GMT",
    location: "Montreal, Canada",
    circuit: "Circuit Gilles Villeneuve",
    status: "upcoming",
  },
  {
    id: 3,
    name: "British Grand Prix",
    date: "July 6, 2025",
    time: "15:00 GMT",
    location: "Silverstone, United Kingdom",
    circuit: "Silverstone Circuit",
    status: "upcoming",
  },
]

export default function UpcomingRaces() {
  return (
    <div className="grid gap-6">
      {upcomingRaces.map((race) => (
        <Card key={race.id}>
          <CardHeader>
            <CardTitle>{race.name}</CardTitle>
            <CardDescription>{race.circuit}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{race.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{race.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{race.location}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Race Details</Button>
            <Button>Add to Calendar</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
