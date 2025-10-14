import { createContext, useState } from 'react'

const ReviewContext = createContext()

export const ReviewProvider = ({ children }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [restaurantId, setRestaurantId] = useState(null)

  return (
    <ReviewContext.Provider
      value={{ showDialog, setShowDialog, restaurantId, setRestaurantId }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export default ReviewContext
