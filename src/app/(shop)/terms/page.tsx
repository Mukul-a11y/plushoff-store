"use client"

import { FileText, Scale, Gavel, AlertCircle } from "lucide-react"

const termsSections = [
  {
    icon: FileText,
    title: "Agreement to Terms",
    content: [
      "By accessing or using Plushoff's website and services, you agree to be bound by these Terms of Service.",
      "If you disagree with any part of these terms, you may not access our services.",
      "These terms apply to all users, customers, and visitors of our website."
    ]
  },
  {
    icon: Scale,
    title: "Use License",
    content: [
      "Permission is granted to temporarily access Plushoff's website for personal, non-commercial use only.",
      "You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, transfer, or sell any information obtained from our website.",
      "This license shall automatically terminate if you violate any of these restrictions."
    ]
  },
  {
    icon: Gavel,
    title: "Disclaimer",
    content: [
      "The materials on Plushoff's website are provided on an 'as is' basis.",
      "We make no warranties, expressed or implied, and hereby disclaim all warranties, including without limitation implied warranties of merchantability and fitness for a particular purpose.",
      "We do not warrant that our website will be uninterrupted or error-free."
    ]
  },
  {
    icon: AlertCircle,
    title: "Limitations",
    content: [
      "In no event shall Plushoff be liable for any damages arising out of the use or inability to use our website.",
      "We are not responsible for any indirect, incidental, special, consequential, or punitive damages.",
      "Our liability is limited to the amount paid by you for the product or service in question."
    ]
  }
]

export default function TermsPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Terms of Service</h1>
        <p className="mb-8 text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600">
            Welcome to Plushoff. By using our website and services, you agree to these terms. Please read them carefully.
          </p>

          <div className="mt-12 space-y-12">
            {termsSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <section.icon className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                </div>
                <ul className="space-y-2 text-gray-600">
                  {section.content.map((item) => (
                    <li key={item} className="flex items-start space-x-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-gray-50 p-6">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p className="mt-2 text-gray-600">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@plushoff.com" className="text-primary hover:underline">
                legal@plushoff.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 