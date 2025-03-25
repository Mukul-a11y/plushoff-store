"use client"

import { Shield, Lock, Eye, Share2 } from "lucide-react"

const privacySections = [
  {
    icon: Shield,
    title: "Information We Collect",
    content: [
      "Personal information (name, email, phone number)",
      "Shipping and billing addresses",
      "Payment information",
      "Order history and preferences",
      "Device and usage information"
    ]
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: [
      "Process your orders and payments",
      "Send order confirmations and updates",
      "Provide customer support",
      "Improve our products and services",
      "Send marketing communications (with your consent)"
    ]
  },
  {
    icon: Eye,
    title: "Information Sharing",
    content: [
      "We do not sell your personal information",
      "Share with shipping partners for delivery",
      "Share with payment processors for transactions",
      "Share with service providers who assist our operations",
      "Share when required by law"
    ]
  },
  {
    icon: Share2,
    title: "Your Rights",
    content: [
      "Access your personal information",
      "Correct inaccurate information",
      "Request deletion of your information",
      "Opt-out of marketing communications",
      "Export your data"
    ]
  }
]

export default function PrivacyPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
        <p className="mb-8 text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600">
            At Plushoff, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
          </p>

          <div className="mt-12 space-y-12">
            {privacySections.map((section) => (
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
              If you have any questions about our Privacy Policy or how we handle your personal information, please contact us at{" "}
              <a href="mailto:privacy@plushoff.com" className="text-primary hover:underline">
                privacy@plushoff.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 