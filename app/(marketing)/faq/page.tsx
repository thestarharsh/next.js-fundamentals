import React from 'react'
import Link from 'next/link'

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-8">
        <FAQ
          question="What is Linear Clone?"
          answer="Linear Clone is a project management tool inspired by Linear. It helps teams organize, track, and manage their projects and issues in a simple and efficient way."
        />

        <FAQ
          question="How do I create an account?"
          answer="You can create an account by clicking the 'Sign Up' button in the top navigation bar. You'll need to provide an email address and create a password."
        />

        <FAQ
          question="Is it free to use?"
          answer="Yes, Linear Clone is completely free to use as it's an open-source project. You can even download the source code and host it yourself."
        />

        <FAQ
          question="Can I contribute to the project?"
          answer={
            <>
              Absolutely! Linear Clone is open-source and contributions are
              welcome. Check out our{' '}
              <Link
                href="https://github.com/yourusername/linear-clone"
                className="text-purple-600 hover:underline"
              >
                GitHub repository
              </Link>{' '}
              to get started.
            </>
          }
        />

        <FAQ
          question="How do I report bugs or request features?"
          answer="You can report bugs or request features by opening an issue on our GitHub repository. We appreciate your feedback and contributions!"
        />

        <FAQ
          question="What technologies does Linear Clone use?"
          answer="Linear Clone is built with Next.js, TypeScript, Tailwind CSS, and uses a PostgreSQL database. It leverages the latest features of Next.js App Router for optimal performance."
        />
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Still have questions? Feel free to{' '}
          <Link
            href="mailto:support@linearclone.com"
            className="text-purple-600 hover:underline"
          >
            contact us
          </Link>
        </p>
      </div>
    </div>
  )
}

interface FAQProps {
  question: string
  answer: React.ReactNode
}

function FAQ({ question, answer }: FAQProps) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="text-xl font-semibold mb-2">{question}</h3>
      <div className="text-gray-600">{answer}</div>
    </div>
  )
}
