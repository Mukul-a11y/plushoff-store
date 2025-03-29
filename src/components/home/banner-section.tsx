"use client"

import Link from "next/link"
import Image from "next/image"

export function BannerSection() {
  return (
    <section className="px-4 mb-8 md:mb-12" style={{ aspectRatio: '1.85/1' }}>
      <div className="container mx-auto h-full">
        {/* Now the entire banner section has 1.85:1 aspect ratio */}
        <div className="w-full h-full relative">
          <div className="absolute inset-0 flex flex-col md:flex-row gap-2 md:gap-4">
            {/* Left Column */}
            <div className="w-full md:w-1/2 h-full flex flex-col gap-2">
              <div className="flex-1 overflow-hidden">
                <div className="h-full aspect-[3/4] mx-auto"> 
                  <Image
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"
                    alt="Featured outfit"
                    width={600}
                    height={800} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="h-full aspect-[3/4] mx-auto"> 
                  <Image
                    src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=600"
                    alt="Featured outfit"
                    width={600}
                    height={800} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="h-full aspect-[3/4] mx-auto"> 
                  <Image
                    src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600"
                    alt="Featured outfit"
                    width={600}
                    height={800} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Center Column */}
            <div className="w-full md:w-1/4 h-full flex flex-col items-center justify-center text-center">
              <h1 className="text-lg uppercase tracking-widest mb-4">Plush Off</h1>
              <div className="mb-6">
                <h2 className="font-serif text-4xl md:text-5xl tracking-wide">BEST</h2>
                <h2 className="font-serif text-4xl md:text-5xl tracking-wide">SELLERS</h2>
              </div>
              <Link 
                href="/best-sellers"
                className="border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition-colors duration-300"
              >
                Shop Now
              </Link>
            </div>
            
            {/* Right Column */}
            <div className="w-full md:w-1/4 h-full flex flex-col gap-2">
              <div className="flex-1 overflow-hidden">
                <div className="h-full aspect-[3/4] mx-auto"> 
                  <Image
                    src="https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600"
                    alt="Featured outfit"
                    width={600}
                    height={800} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="h-full aspect-[3/4] mx-auto"> 
                  <Image
                    src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600"
                    alt="Featured outfit"
                    width={600}
                    height={800} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}