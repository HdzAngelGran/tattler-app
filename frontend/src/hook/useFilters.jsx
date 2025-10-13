import { useState } from 'react'

const useFilters = () => {
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState(10)
  const [name, setName] = useState('')
  const [cuisine, setCuisine] = useState(null)
  const filters = { page: page + 1, size: rows, name, cuisine: cuisine?.code }
  return {
    page,
    setPage,
    rows,
    setRows,
    name,
    setName,
    cuisine,
    setCuisine,
    filters: Object.entries(filters).filter(([key, value]) => {
      return value != null && value !== ''
    }),
  }
}

export default useFilters
