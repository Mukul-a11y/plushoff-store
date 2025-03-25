"use client"

import { Package, Clock, RefreshCw, Shield } from "lucide-react"

const returnFeatures = [
  {
    icon: Package,
    title: "Easy Returns",
    description: "Simple and hassle-free return process with our prepaid shipping labels."
  },
  {
    icon: Clock,
    title: "30-Day Window",
    description: "Generous 30-day return window for most items to ensure you're completely satisfied."
  },
  {
    icon: RefreshCw,
    title: "Quick Refunds",
    description: "Fast refund processing within 5-7 business days of receiving your return."
  },
  {
    icon: Shield,
    title: "Secure Process",
    description: "Safe and secure return process with tracking and insurance coverage."
  }
]

const returnSteps = [
  {
    title: "Initiate Return",
    description: "Log into your account, select the order, and click 'Return Item'. Choose your reason for return and select your preferred refund method."
  },
  {
    title: "Pack Item",
    description: "Carefully pack the item in its original packaging with all accessories and documentation. Include the return form we provide."
  },
  {
    title: "Ship Return",
    description: "Use the prepaid shipping label we provide to ship your return. Drop off the package at any authorized shipping location."
  },
  {
    title: "Track & Refund",
    description: "Track your return shipment and receive your refund once we process the returned item."
  }
]

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Returns & Exchanges</h1>
        
        <div className="prose prose-lg mb-12">
          <p className="text-gray-600">
            We want you to be completely satisfied with your purchase. Our
            customer-friendly return policy makes it easy to return or exchange
            items that don't meet your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {returnFeatures.map((feature) => (
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
          <h2 className="text-2xl font-bold mb-6">Return Process</h2>
          <div className="space-y-6">
            {returnSteps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                We offer a 30-day return window for most items. Products must be:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Unused and in original condition</li>
                <li>In original packaging with all accessories</li>
                <li>Include original tags and documentation</li>
                <li>Accompanied by the return form</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Non-Returnable Items</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                The following items cannot be returned:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Personal care items</li>
                <li>Underwear and swimwear</li>
                <li>Custom or personalized items</li>
                <li>Items marked as "Final Sale"</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Refund Information</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Refunds will be processed within 5-7 business days of receiving your
              return. The refund will be issued to the original payment method
              used for the purchase.
            </p>
            <p className="text-gray-600">
              Shipping costs are non-refundable unless the item was received
              damaged or incorrect. For international returns, customs duties and
              taxes are non-refundable.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Have questions about returns? Our customer service team is here to
            help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
} 