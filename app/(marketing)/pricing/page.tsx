import React from 'react'
import Link from 'next/link'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">
          Choose the plan that&apos;s right for you and your team
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Free Plan */}
        <PricingCard
          title="Free"
          price="$0"
          description="Perfect for individuals and small teams getting started."
          features={[
            { name: 'Up to 3 team members', included: true },
            { name: 'Unlimited issues', included: true },
            { name: 'Basic issue tracking', included: true },
            { name: 'Email support', included: true },
            { name: 'API access', included: false },
            { name: 'Custom fields', included: false },
            { name: 'Advanced integrations', included: false },
          ]}
          buttonText="Sign Up Free"
          buttonLink="/auth/signup"
        />

        {/* Pro Plan */}
        <PricingCard
          title="Pro"
          price="$10"
          period="per user / month"
          description="For growing teams that need more features and flexibility."
          features={[
            { name: 'Unlimited team members', included: true },
            { name: 'Unlimited issues', included: true },
            { name: 'Advanced issue tracking', included: true },
            { name: 'Priority support', included: true },
            { name: 'API access', included: true },
            { name: 'Custom fields', included: true },
            { name: 'Advanced integrations', included: false },
          ]}
          buttonText="Coming Soon"
          buttonLink="#"
          highlighted
          badge="Popular"
        />

        {/* Enterprise Plan */}
        <PricingCard
          title="Enterprise"
          price="Custom"
          description="For organizations that need advanced security and support."
          features={[
            { name: 'Unlimited team members', included: true },
            { name: 'Unlimited issues', included: true },
            { name: 'Advanced issue tracking', included: true },
            { name: 'Dedicated support', included: true },
            { name: 'API access', included: true },
            { name: 'Custom fields', included: true },
            { name: 'Advanced integrations', included: true },
          ]}
          buttonText="Contact Sales"
          buttonLink="mailto:sales@linearclone.com"
        />
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <FAQItem
            question="Can I upgrade or downgrade my plan at any time?"
            answer="Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated amount for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle."
          />
          <FAQItem
            question="Do you offer a discount for annual billing?"
            answer="Yes, we offer a 15% discount when you choose annual billing instead of monthly billing."
          />
          <FAQItem
            question="Is there a limit to how many issues I can create?"
            answer="No, all plans include unlimited issues. You can create as many as you need to manage your projects effectively."
          />
          <FAQItem
            question="What payment methods do you accept?"
            answer="We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal."
          />
          <FAQItem
            question="Do you offer any non-profit or educational discounts?"
            answer="Yes, we offer special pricing for non-profit organizations and educational institutions. Please contact our sales team for more information."
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-16 text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Contact our sales team to discuss your specific requirements.
        </p>
        <a
          href="mailto:sales@linearclone.com"
          className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
        >
          Contact Sales
        </a>
      </div>
    </div>
  )
}

interface PricingFeature {
  name: string
  included: boolean
}

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: PricingFeature[]
  buttonText: string
  buttonLink: string
  highlighted?: boolean
  badge?: string
}

function PricingCard({
  title,
  price,
  period = 'per month',
  description,
  features,
  buttonText,
  buttonLink,
  highlighted = false,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-lg p-6 ${
        highlighted
          ? 'bg-blue-50 border-2 border-blue-200 shadow-md relative'
          : 'bg-white border border-gray-200 shadow-sm'
      }`}
    >
      {badge && (
        <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-gray-600"> {period}</span>}
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            {feature.included ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
            )}
            <span className={feature.included ? '' : 'text-gray-400'}>
              {feature.name}
            </span>
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

interface FAQItemProps {
  question: string
  answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  )
}
