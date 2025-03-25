"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How do I place an order?",
    answer: "To place an order, simply browse our products, select the items you want, and add them to your cart. Then proceed to checkout, where you'll need to provide your shipping and payment information. Review your order details and click 'Place Order' to complete your purchase."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our payment partners."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your order status on our website or the shipping carrier's website. You can also view your order status in your account dashboard."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return window for most items. Products must be unused and in their original packaging. Shipping costs for returns are the responsibility of the customer unless the item was received damaged or incorrect. Visit our returns page for more details."
  },
  {
    question: "How do I change my shipping address?",
    answer: "You can update your shipping address in your account settings or during the checkout process. If you need to change the address for an existing order, please contact our customer service team as soon as possible."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can check shipping rates and estimated delivery times during checkout."
  },
  {
    question: "How do I cancel my order?",
    answer: "If your order hasn't been shipped yet, you can cancel it through your account dashboard or by contacting our customer service team. Once an order has been shipped, it cannot be cancelled but can be returned using our return process."
  },
  {
    question: "What is your warranty policy?",
    answer: "Most products come with a manufacturer's warranty. The duration and terms of the warranty vary by product. Please check the product description for specific warranty information."
  },
  {
    question: "How do I contact customer service?",
    answer: "You can reach our customer service team through multiple channels: email (support@plushoff.com), phone (+1 234 567 890), or our contact form. We typically respond within 24 hours during business days."
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes, we offer digital gift cards that can be purchased and sent via email. Gift cards can be used for any purchase on our website and never expire."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        
        <div className="prose prose-lg mb-12">
          <p className="text-gray-600">
            Find answers to common questions about our products, services, and
            policies. If you can't find what you're looking for, please don't
            hesitate to{" "}
            <a href="/contact" className="text-primary hover:underline">
              contact us
            </a>
            .
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our customer service team is
            here to help.
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