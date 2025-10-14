import { useContext, useEffect } from 'react'
import ReviewContext from '../context/ReviewContext'

const useReviewDialog = () => {
  const context = useContext(ReviewContext)

  if (context === undefined)
    throw new Error('useReviewDialog must be used within a ReviewProvider')

  return context
}

export default useReviewDialog
