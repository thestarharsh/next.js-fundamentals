'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from './ui/Button'
import { Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'

interface DeleteIssueButtonProps {
  id: number
}

export default function DeleteIssueButton({ id }: DeleteIssueButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/issues/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete issue')
      }

      toast.success('Issue deleted successfully')
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      toast.error('Failed to delete issue')
      console.error('Error deleting issue:', error)
      setIsDeleting(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          isLoading={isDeleting}
        >
          Delete
        </Button>
      </div>
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={() => setShowConfirm(true)}>
      <span className="flex items-center">
        <Trash2Icon size={16} className="mr-1" />
        Delete
      </span>
    </Button>
  )
}
