"use client"

import { Truck, Package, Clock, Globe } from "lucide-react"

const shippingMethods = [
  {
    icon: Truck,
    title: "Standard Shipping",
    description: "3-5 business days",
    price: "Free on orders over $50",
    details: "Standard shipping is free for orders over $50. Orders under $50 will incur a $5.99 shipping fee."
  },
  {
    icon: Package,
    title: "Express Shipping",
    description: "1-2 business days",
    price: "$12.99",
    details: "Get your order delivered quickly with our express shipping option. Available for most locations."
  },
  {
    icon: Clock,
    title: "Next Day Delivery",
    description: "Next business day",
    price: "$24.99",
    details: "Order by 2 PM EST for next business day delivery. Available in select areas."
  },
  {
    icon: Globe,
    title: "International Shipping",
    description: "5-14 business days",
    price: "Varies by location",
    details: "We ship to most countries worldwide. Shipping costs and delivery times vary by location."
  }
]

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>
        
        <div className="prose prose-lg mb-12">
          <p className="text-gray-600">
            We offer various shipping options to meet your needs. Choose the method
            that works best for you during checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {shippingMethods.map((method) => (
            <div
              key={method.title}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <method.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-2">{method.description}</p>
              <p className="font-medium text-primary mb-4">{method.price}</p>
              <p className="text-gray-600">{method.details}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Shipping FAQs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                How do I track my order?
              </h3>
              <p className="text-gray-600">
                Once your order is shipped, you'll receive a tracking number via
                email. You can use this number to track your order status on our
                website or the shipping carrier's website.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                When will my order ship?
              </h3>
              <p className="text-gray-600">
                Orders are typically processed and shipped within 1-2 business
                days. You'll receive a shipping confirmation email once your order
                has been shipped.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Can I change my shipping address?
              </h3>
              <p className="text-gray-600">
                You can update your shipping address in your account settings or
                during the checkout process. If you need to change the address for
                an existing order, please contact our customer service team as soon
                as possible.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Do you ship to PO boxes?
              </h3>
              <p className="text-gray-600">
                Yes, we ship to PO boxes. However, some shipping methods may not be
                available for PO box addresses. Please check the available options
                during checkout.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-4">Shipping Restrictions</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Some items may have shipping restrictions due to their size, weight,
              or content. These restrictions will be clearly indicated on the
              product page.
            </p>
            <p className="text-gray-600">
              For international orders, please note that customs duties and taxes
              may apply. These charges are the responsibility of the customer and
              are not included in the shipping cost.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Have questions about shipping? Our customer service team is here to
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