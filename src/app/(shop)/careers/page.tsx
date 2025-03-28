"use client"

import { Briefcase, Users, Rocket, Heart } from "lucide-react"

const benefits = [
  {
    icon: Briefcase,
    title: "Competitive Salary",
    description: "We offer competitive salaries and regular performance reviews."
  },
  {
    icon: Users,
    title: "Great Team",
    description: "Work with talented and passionate individuals in a collaborative environment."
  },
  {
    icon: Rocket,
    title: "Growth Opportunities",
    description: "Continuous learning and development opportunities to advance your career."
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible working hours and remote work options to maintain a healthy balance."
  }
]

const openPositions = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "We're looking for an experienced frontend developer to join our team and help build the next generation of our e-commerce platform."
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Hybrid",
    type: "Full-time",
    description: "Join our product team to help shape the future of Plushoff's product offerings and user experience."
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Help our customers succeed by providing exceptional support and building strong relationships."
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Hybrid",
    type: "Full-time",
    description: "Create and execute marketing campaigns to grow our brand and reach new customers."
  }
]

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Careers at Plushoff</h1>
        
        <div className="prose prose-lg mb-12">
          <p className="text-gray-600 mb-6">
            Join our team and be part of a fast-growing e-commerce company that's
            revolutionizing online shopping. At Plushoff, we're passionate about
            creating exceptional experiences for our customers and building a
            workplace where talented individuals can thrive.
          </p>
          
          <p className="text-gray-600">
            We&apos;re always looking for talented individuals who share our passion for innovation and customer satisfaction. If you don&apos;t see a position that matches your skills, feel free to send us your resume for future opportunities.
          </p>
          <p className="text-gray-600">
            We&apos;re committed to creating an inclusive workplace where everyone can thrive.
          </p>
          <p className="text-gray-600">
            We&apos;re proud to be an equal opportunity employer.
          </p>
          <p className="text-gray-600">
            All qualified applicants will receive consideration for employment without regard to race, color, religion, gender, gender identity or expression, sexual orientation, national origin, genetics, disability, age, or veteran status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <benefit.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position) => (
              <div
                key={position.title}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="text-sm text-gray-600">{position.department}</span>
                  <span className="text-sm text-gray-600">{position.location}</span>
                  <span className="text-sm text-gray-600">{position.type}</span>
                </div>
                <p className="text-gray-600 mb-4">{position.description}</p>
                <a
                  href={`/careers/${position.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Why Join Plushoff?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Innovative Culture</h3>
              <p className="text-gray-600">
                We&apos;re looking for passionate individuals to join our growing team.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Impact</h3>
              <p className="text-gray-600">
                We&apos;re committed to fostering a culture of innovation and growth.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Diversity & Inclusion</h3>
              <p className="text-gray-600">
                We&apos;re always looking for talented people.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Benefits</h3>
              <p className="text-gray-600">
                We&apos;re excited about the future.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Don&apos;t See the Right Role?</h2>
          <p className="text-gray-600 mb-6">
            We&apos;re always looking for talented individuals. Send us your resume and we&apos;ll keep you in mind for future opportunities.
          </p>
          <a
            href="/careers/contact"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
} 