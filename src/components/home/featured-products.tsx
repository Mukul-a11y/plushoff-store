"use client"

import Image from "next/image"
import Link from "next/link"

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Classic White Tee",
    price: "₹999",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: "₹2499",
    image: "https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?w=800"
  },
  {
    id: 3,
    name: "Summer Dress",
    price: "₹1799",
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800"
  },
  {
    id: 4,
    name: "Leather Bag",
    price: "₹3999",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800"
  }
]

export function FeaturedProducts() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-serif text-center mb-12">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {FEATURED_PRODUCTS.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  )
} 