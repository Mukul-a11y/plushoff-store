"use client"

import Link from "next/link"
import Image from "next/image"

const PRODUCTS = [
  {
    id: 1,
    name: "Fresh Pears",
    price: "₹199",
    brand: "Nature's Best",
    image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=800"
  },
  {
    id: 2,
    name: "Organic Mushrooms",
    price: "₹149",
    brand: "Green Farms",
    image: "https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=800"
  },
  {
    id: 3,
    name: "Red Cherries",
    price: "₹299",
    brand: "Fresh Pick",
    image: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800"
  }
]

export function ProductsSection() {
  return (
    <section className="px-4 mb-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg md:text-2xl font-serif">Featured Products</h2>
          <Link href="/products" className="text-sm md:text-base hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {PRODUCTS.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="space-y-2 md:space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm md:text-base text-gray-500">{product.brand}</p>
                <p className="font-medium md:text-lg">{product.name}</p>
                <p className="text-sm md:text-base">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 