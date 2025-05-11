"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HeroSlide = {
  id: number
  title: string
  description: string
  image: string
  link: string
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "2025 Season Opener",
    description: "The new season kicks off this weekend. Don't miss the action!",
    image: "/placeholder.svg?height=800&width=1600",
    link: "/races/2025-season-opener",
  },
  {
    id: 2,
    title: "Driver Spotlight: Alex Johnson",
    description: "Learn about the rising star who's taking the racing world by storm.",
    image: "/placeholder.svg?height=800&width=1600",
    link: "/drivers/alex-johnson",
  },
  {
    id: 3,
    title: "New Track Revealed",
    description: "Explore the challenging new circuit added to this year's championship.",
    image: "/placeholder.svg?height=800&width=1600",
    link: "/tracks/new-circuit",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (isAutoPlaying && !prefersReducedMotion) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, prefersReducedMotion])

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const slide = heroSlides[currentSlide]

  return (
    <section
      className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Featured content carousel"
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background to-transparent" />

      <div className="relative h-full w-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={index !== currentSlide}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt=""
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-md">{slide.title}</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-xl mb-6 drop-shadow-md">{slide.description}</p>
          <Button asChild size="lg">
            <Link href={slide.link}>Learn More</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentSlide ? "bg-primary scale-110" : "bg-primary/40 hover:bg-primary/60",
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  )
}
