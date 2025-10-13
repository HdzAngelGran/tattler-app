import { useQuery } from '@tanstack/react-query'
import { getRestaurantById } from '../services/restaurant'

const useRestaurant = (restaurantId) => {
  return useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => getRestaurantById(restaurantId),
    refetchOnWindowFocus: false,
    enabled: !!restaurantId,
  })
}

export default useRestaurant
