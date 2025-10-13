import { useQuery } from '@tanstack/react-query'
import { getAllRestaurants } from '../services/restaurant'

const useRestaurantsList = (filters = {}) => {
  return useQuery({
    queryKey: ['restaurants', filters],
    queryFn: () => getAllRestaurants(filters),
    refetchOnWindowFocus: false,
  })
}

export default useRestaurantsList
