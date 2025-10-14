import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addRestaurant } from '../services/restaurant'
import { useAuth } from '../context/AuthContext'

export default function useAddRestaurant() {
  const { token, isAuthenticated } = useAuth()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (restaurantData) => {
      if (!isAuthenticated) {
        const e = new Error('You must be logged in to add a restaurant')
        e.isAuth = true
        throw e
      }
      return addRestaurant(restaurantData, token)
    },
    onSuccess: () => {
      qc.invalidateQueries(['restaurants'])
    },
  })
}
