"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement contact form API call
      console.log("Submitting contact form:", formData)
      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
    } catch (error) {
      console.error("Error submitting contact form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        
        <div className="prose prose-lg mb-12">
          <p className="text-gray-600">
            Have questions or feedback? We'd love to hear from you. Our team is
            here to help and answer any questions you might have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600">
                  <a
                    href="mailto:support@plushoff.com"
                    className="text-primary hover:underline"
                  >
                    support@plushoff.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">
                  <a
                    href="tel:+1234567890"
                    className="text-primary hover:underline"
                  >
                    +1 (234) 567-890
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-gray-600">
                  123 Shopping Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
            
            {isSuccess ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg">
                Thank you for your message! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                How can I track my order?
              </h3>
              <p className="text-gray-600">
                Once your order is shipped, you'll receive a tracking number via
                email. You can use this number to track your order status on our
                website or the shipping carrier's website.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What is your return policy?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day return window for most items. Products must be
                unused and in their original packaging. Visit our{" "}
                <a href="/returns" className="text-primary hover:underline">
                  returns page
                </a>{" "}
                for more details.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                How do I change my shipping address?
              </h3>
              <p className="text-gray-600">
                You can update your shipping address in your account settings or
                during the checkout process. If you need to change the address for
                an existing order, please contact our customer service team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 