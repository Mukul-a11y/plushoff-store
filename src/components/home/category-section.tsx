"use client"

import Link from "next/link"
import Image from "next/image"

const CATEGORIES = [
  { name: "Fruits", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800" },
  { name: "Vegetables", image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=800" },
  { name: "Dairy", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800" },
  { name: "Bakery", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800" }
]

export function CategorySection() {
  return (
    <section className="px-4 py-6 md:py-12">
      <div className="container mx-auto">
        <h2 className="hidden md:block text-2xl font-serif mb-8">Shop by Category</h2>
        <div className="flex gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide md:grid md:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
              className="flex-shrink-0 md:flex-shrink group"
            >
              <div className="w-20 h-20 md:w-full md:h-64 rounded-full md:rounded-lg overflow-hidden mb-2">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={800}
                  height={800}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm md:text-lg text-center md:mt-4">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 