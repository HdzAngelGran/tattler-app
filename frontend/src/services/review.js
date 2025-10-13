const baseUrl = '/api/v1/restaurant'

export const getReviewsByRestaurantId = async (restaurantId) => {
  const URL = `${baseUrl}/${restaurantId}/review`
  const response = await fetch(URL)
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants')
  }
  return response.json()
}
