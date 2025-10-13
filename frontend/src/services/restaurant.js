const baseUrl = '/api/v1/restaurant'

export const getAllRestaurants = async (filters) => {
  const URL = baseUrl + '?' + new URLSearchParams(filters)
  const response = await fetch(URL)
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants')
  }
  return response.json()
}

export const getRestaurantById = async (restaurantId) => {
  const URL = baseUrl + '/' + restaurantId
  const response = await fetch(URL)
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants')
  }
  return response.json()
}

export const addRestaurant = async (restaurantData, token) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(restaurantData),
  })
  if (!response.ok) {
    throw new Error('Failed to add restaurant')
  }
  return response.json()
}
