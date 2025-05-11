import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Flag, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Flag className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ABC Racing</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            The official website of ABC Racing. Get the latest news, race schedules, driver profiles, and more.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Quick Links</h3>
          <nav className="grid gap-2">
            <Link href="/races" className="text-sm text-muted-foreground hover:text-foreground">
              Race Calendar
            </Link>
            <Link href="/drivers" className="text-sm text-muted-foreground hover:text-foreground">
              Driver Standings
            </Link>
            <Link href="/teams" className="text-sm text-muted-foreground hover:text-foreground">
              Team Standings
            </Link>
            <Link href="/tickets" className="text-sm text-muted-foreground hover:text-foreground">
              Buy Tickets
            </Link>
            <Link href="/store" className="text-sm text-muted-foreground hover:text-foreground">
              Official Store
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Information</h3>
          <nav className="grid gap-2">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About Us
            </Link>
            <Link href="/history" className="text-sm text-muted-foreground hover:text-foreground">
              Racing History
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact Us
            </Link>
            <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
              Careers
            </Link>
            <Link href="/press" className="text-sm text-muted-foreground hover:text-foreground">
              Press Room
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Subscribe</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sign up for our newsletter to receive the latest updates and exclusive offers.
          </p>
          <form className="space-y-2">
            <Input type="email" placeholder="Your email address" />
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ABC Racing. All rights reserved.
          </p>
          <nav className="flex gap-4 flex-wrap">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="text-xs text-muted-foreground hover:text-foreground">
              Accessibility
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
