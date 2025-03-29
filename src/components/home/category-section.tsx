"use client"

import Link from "next/link"
import Image from "next/image"

const CATEGORIES = [
  { name: "Casual Set", image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=300" },
  { name: "Basic Set", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300" },
  { name: "Party Set", image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=300" },
  { name: "Dresses", image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=300" },
  { name: "Night Sets", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300" },
  { name: "Winter Collections", image: "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?w=300" }
]

export function CategorySection() {
  return (
    <section className="px-4 py-6 md:py-10">
      <div className="container mx-auto">
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.name.toLowerCase().replace(" ", "-")}`}
              className="flex-shrink-0 flex flex-col items-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-2">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-xs md:text-sm text-center">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}