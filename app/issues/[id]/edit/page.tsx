import { getCurrentUser } from '@/lib/auth'
import { getIssue } from '@/app/actions/issues'
import { redirect, notFound } from 'next/navigation'
import IssueForm from '@/app/components/IssueForm'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default async function EditIssuePage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/signin')
  }

  const issue = await getIssue(parseInt(params.id))

  if (!issue) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <Link
        href={`/issues/${params.id}`}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-6"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Issue
      </Link>

      <h1 className="text-2xl font-bold mb-6">Edit Issue</h1>

      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6">
        <IssueForm userId={user.id} issue={issue} isEditing />
      </div>
    </div>
  )
}
