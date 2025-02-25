import React from 'react'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Features</h1>
        <p className="text-xl text-gray-600">
          Discover how Linear Clone can help you manage your projects more
          efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          title="Issue Tracking"
          description="Create, assign, and track issues with ease. Set priorities, due dates, and statuses to keep your team on track."
        />
        <FeatureCard
          title="Intuitive UI"
          description="A clean, modern interface that makes project management a breeze. No clutter, just what you need to get work done."
        />
        <FeatureCard
          title="Collaboration"
          description="Work together seamlessly. Comment on issues, mention team members, and keep everyone in the loop."
        />
        <FeatureCard
          title="Custom Workflows"
          description="Create workflows that match your team's process. Customize statuses, labels, and more."
        />
        <FeatureCard
          title="Real-time Updates"
          description="See changes as they happen. No need to refresh or wait for updates."
        />
        <FeatureCard
          title="Powerful Search"
          description="Find anything instantly with our powerful search. Filter by assignee, status, priority, and more."
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Compare Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <PlanCard
            title="Free"
            price="$0"
            description="Perfect for individuals and small teams getting started."
            features={[
              'Up to 3 team members',
              'Unlimited issues',
              'Basic issue tracking',
              'Email support',
            ]}
            buttonText="Get Started"
            buttonLink="/auth/signup"
          />

          {/* Pro Plan */}
          <PlanCard
            title="Pro"
            price="$10"
            description="For growing teams that need more features and flexibility."
            features={[
              'Unlimited team members',
              'Advanced reporting',
              'Custom fields',
              'API access',
              'Priority support',
            ]}
            buttonText="Coming Soon"
            buttonLink="#"
            highlighted
          />

          {/* Enterprise Plan */}
          <PlanCard
            title="Enterprise"
            price="Custom"
            description="For organizations that need advanced security and support."
            features={[
              'Everything in Pro',
              'Dedicated support',
              'Custom integrations',
              'Advanced security',
              'SLA guarantees',
            ]}
            buttonText="Contact Sales"
            buttonLink="mailto:sales@linearclone.com"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of teams already using Linear Clone to manage their
          projects.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/signup"
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
          >
            Sign Up Free
          </Link>
          <Link
            href="/faq"
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

interface PlanCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonLink: string
  highlighted?: boolean
}

function PlanCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonLink,
  highlighted = false,
}: PlanCardProps) {
  return (
    <div
      className={`rounded-lg p-6 ${
        highlighted
          ? 'bg-blue-50 border-2 border-blue-200 shadow-md'
          : 'bg-white border border-gray-200 shadow-sm'
      }`}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-gray-600">/month</span>}
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={buttonLink}
        className={`w-full inline-flex h-10 items-center justify-center rounded-md px-8 py-2 text-sm font-medium shadow transition-colors ${
          highlighted
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-white border border-gray-200 hover:bg-gray-50'
        }`}
      >
        {buttonText}
      </Link>
    </div>
  )
}
