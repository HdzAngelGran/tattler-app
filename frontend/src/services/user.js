const baseUrl = '/api/v1/user'

export const login = async (userData) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const errorData = await response.json() // Attempt to read error response body
    throw new Error(errorData.message || 'Failed to send login link')
  }

  return response.json()
}

export const verifyToken = async (token) => {
  const response = await fetch(`${baseUrl}/verify?token=${token}`)

  if (!response.ok) {
    const errorData = await response.json() // Attempt to read error response body
    throw new Error(errorData.message || 'Failed to verify token')
  }

  return response.json()
}
