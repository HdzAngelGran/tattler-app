import { createContext, useState } from 'react'

export const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])
  const [filters, setFilters] = useState({})

  return (
    <FilterContext.Provider
      value={{ restaurants, setRestaurants, filters, setFilters }}
    >
      {children}
    </FilterContext.Provider>
  )
}
