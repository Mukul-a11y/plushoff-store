"use client"

import Link from "next/link"
import Image from "next/image"

const BEST_SELLERS = [
  {
    id: 1,
    name: "Kora",
    price: "₹3,999",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300"
  },
  {
    id: 2,
    name: "Laila / Payal Casual Set",
    price: "₹2,999",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=300"
  },
  {
    id: 3,
    name: "Meera Glam Set 100% Rayon",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300"
  },
  {
    id: 4,
    name: "Golu Three Piece Casual Set",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=300"
  },
  {
    id: 5,
    name: "Softee Matka Silk Set",
    price: "₹3,999",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300"
  },
  {
    id: 6,
    name: "Orange Casual Set 100%",
    price: "₹3,599",
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=300"
  }
]

const NEW_ARRIVALS = [
  {
    id: 1,
    name: "Pink Passion 100% Silk Set",
    price: "₹2,999",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=300"
  },
  {
    id: 2,
    name: "Rainbow Exotic Set",
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1499939667766-4afceb292d05?w=300"
  },
  {
    id: 3,
    name: "Girly Printed A-Cut Casual Set",
    price: "₹2,899",
    image: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=300"
  },
  {
    id: 4,
    name: "Royal Pink PC Casual Set",
    price: "₹2,999",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300"
  },
  {
    id: 5,
    name: "Night Elegance PC Casual",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=300"
  },
  {
    id: 6,
    name: "Sunshine 3 PC Halter Set",
    price: "₹2,399",
    image: "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?w=300"
  }
]

export function ProductsSection() {
  return (
    <>
      {/* Best Sellers Section */}
      <section className="px-4 mb-12">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Best Sellers</h2>
            <Link href="/best-sellers" className="text-sm hover:underline text-red-700">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {BEST_SELLERS.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="space-y-2">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <p className="text-sm">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="px-4 mb-12">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">New Arrivals</h2>
            <Link href="/new-arrivals" className="text-sm hover:underline text-red-700">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {NEW_ARRIVALS.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="space-y-2">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <p className="text-sm">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}