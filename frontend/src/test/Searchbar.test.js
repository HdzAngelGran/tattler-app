import { render, screen, fireEvent } from '@testing-library/react'
import Searchbar from '../components/Searchbar'
import '@testing-library/jest-dom'

describe('Searchbar', () => {
  const mockSetName = jest.fn()
  const mockSetCuisine = jest.fn()
  const mockSetShowDialog = jest.fn()

  const props = {
    name: '',
    setName: mockSetName,
    cuisine: null,
    setCuisine: mockSetCuisine,
    setShowDialog: mockSetShowDialog,
  }

  it('renders the search input, dropdown, and new restaurant button', () => {
    render(<Searchbar {...props} />)

    expect(screen.getByPlaceholderText('Search by restaurant name')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'New Restaurant' })).toBeInTheDocument()
  })

  it('calls setName when the search input value changes', () => {
    render(<Searchbar {...props} />)
    const searchInput = screen.getByPlaceholderText('Search by restaurant name')

    fireEvent.change(searchInput, { target: { value: 'New Name' } })
    expect(mockSetName).toHaveBeenCalledWith('New Name')
  })

  it('calls setCuisine when a cuisine is selected from the dropdown', () => {
    render(<Searchbar {...props} />)
    const dropdown = screen.getByRole('combobox')

    fireEvent.click(dropdown)
    const option = screen.getByText('Mexican')
    fireEvent.click(option)

    expect(mockSetCuisine).toHaveBeenCalled()
  })

  it('calls setShowDialog when the "New Restaurant" button is clicked', () => {
    render(<Searchbar {...props} />)
    const newRestaurantButton = screen.getByRole('button', { name: 'New Restaurant' })

    fireEvent.click(newRestaurantButton)
    expect(mockSetShowDialog).toHaveBeenCalledWith(true)
  })
})
