import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postReview } from '../services/review'
import { useAuth } from '../context/AuthContext'

export default function useSubmitReview() {
  const { token, isAuthenticated } = useAuth()
  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ restaurantId, payload }) => {
      if (!isAuthenticated) {
        const e = new Error('You must be logged in to post a review')
        e.isAuth = true
        throw e
      }
      return postReview(restaurantId, payload, token)
    },
    onSuccess: (_data, variables) => {
      const id = variables.restaurantId
      qc.invalidateQueries(['reviews', id])
      qc.invalidateQueries(['restaurant', id])
    },
  })

  return mutation
}
