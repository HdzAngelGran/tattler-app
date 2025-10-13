import { useQuery } from '@tanstack/react-query'
import { getReviewsByRestaurantId } from '../services/review'

const useReviews = (restaurantId) => {
  return useQuery({
    queryKey: ['reviews', restaurantId],
    queryFn: () => getReviewsByRestaurantId(restaurantId),
    refetchOnWindowFocus: false,
    enabled: !!restaurantId,
  })
}

export default useReviews
