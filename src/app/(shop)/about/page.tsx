"use client"

import { Heart, Star, Truck, Shield } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Customer First",
    description: "We prioritize our customers' satisfaction above everything else."
  },
  {
    icon: Star,
    title: "Quality Products",
    description: "We offer only the highest quality products from trusted brands."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to get your orders to you fast."
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "Your security is our top priority with encrypted transactions."
  }
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Plushoff</h1>
        
        <div className="prose prose-lg mb-12">
          <p className="text-gray-600 mb-6">
            Welcome to Plushoff, your trusted destination for premium shopping
            experiences. Founded in 2024, we've been committed to providing our
            customers with the best products at unbeatable prices.
          </p>
          
          <p className="text-gray-600 mb-6">
            Our mission is to make quality products accessible to everyone while
            maintaining the highest standards of customer service and satisfaction.
            We believe in transparency, honesty, and building lasting relationships
            with our customers.
          </p>
          
          <p className="text-gray-600">
            At Plushoff, we carefully curate our collection to ensure that every
            product meets our strict quality standards. We work directly with
            manufacturers and suppliers to bring you the best deals without
            compromising on quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product in our collection
                undergoes rigorous quality checks to ensure it meets our high
                standards.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Customer Service</h3>
              <p className="text-gray-600">
                Our dedicated customer service team is always ready to help you
                with any questions or concerns. We believe in going above and
                beyond to ensure your satisfaction.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to sustainable practices and reducing our
                environmental impact. We work with eco-friendly packaging and
                partner with suppliers who share our environmental values.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly strive to improve our services and bring you the
                latest products and trends. Our platform is regularly updated with
                new features and improvements.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Be part of our growing community of satisfied customers. Sign up for
            our newsletter to receive exclusive offers and updates.
          </p>
          <a
            href="/newsletter"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Subscribe Now
          </a>
        </div>
      </div>
    </div>
  )
} 