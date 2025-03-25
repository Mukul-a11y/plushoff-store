"use client"

import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=60"
        alt="Plushoff Fashion"
        width={1920}
        height={1080}
        className="object-cover w-full h-full"
        priority
      />
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center p-4">
        <h1 className="text-4xl md:text-6xl font-serif mb-4">Elevate Your Style</h1>
        <p className="text-lg md:text-xl mb-8 max-w-md">Discover our new collection designed for the modern you</p>
        <Link
          href="/shop"
          className="bg-white text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300 font-medium"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
} 