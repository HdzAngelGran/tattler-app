import { useContext, useEffect } from 'react'
import ReviewContext from '../context/ReviewContext'

const useReviewDialog = () => {
  const context = useContext(ReviewContext)

  if (context === undefined)
    throw new Error('useReviewDialog must be used within a ReviewProvider')

  useEffect(() => {
    console.log(context.showDialog)
  }, [context.showDialog])

  return context
}

export default useReviewDialog
