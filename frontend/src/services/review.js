const baseUrl = '/api/v1/restaurant'

export const getReviewsByRestaurantId = async (restaurantId) => {
  const URL = `${baseUrl}/${restaurantId}/review`
  const response = await fetch(URL)
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants')
  }
  return response.json()
}

export const postReview = async (restaurantId, payload, token) => {
  const URL = `${baseUrl}/${restaurantId}/review`
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => null)
    const msg = text || 'Failed to post review'
    throw new Error(msg)
  }

  return response.json()
}
