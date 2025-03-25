"use client"

import Link from "next/link"
import Image from "next/image"

export function BannerSection() {
  return (
    <section className="px-4 mb-8 md:mb-16">
      <div className="container mx-auto">
        <div className="relative aspect-[2/1] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1506617420156-8e4536971650?w=800"
            alt="Banner"
            width={1920}
            height={1080}
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/30">
            <h2 className="text-white text-2xl md:text-4xl font-serif mb-4">Summer Collection 2024</h2>
            <Link 
              href="/collection/summer"
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 