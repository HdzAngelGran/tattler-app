
import { render, screen, fireEvent } from '@testing-library/react'
import RestaurantCard from '../components/RestaurantCard'
import useReviewDialog from '../hook/useReviewDialog'
import { getPriceSigns } from '../utils/priceTransform'

// Mock the custom hook
jest.mock('../hook/useReviewDialog', () => ({
  __esModule: true,
  default: jest.fn(),
}))

// Mock the utility function
jest.mock('../utils/priceTransform', () => ({
  __esModule: true,
  getPriceSigns: jest.fn(),
}))

// Mock PrimeReact components
jest.mock('primereact/card', () => ({
  Card: ({ header, title, subTitle, footer, children }) => (
    <div data-testid='mock-card'>
      {header}
      <h1>{title}</h1>
      <div>{subTitle}</div>
      <div>{children}</div>
      <footer>{footer}</footer>
    </div>
  ),
}))

jest.mock('primereact/button', () => ({
  Button: ({ label, onClick, className, text }) => (
    <button onClick={onClick} className={className} data-text={text}>
      {label}
    </button>
  ),
}))

jest.mock('primereact/rating', () => ({
  Rating: ({ value }) => <div data-testid='mock-rating'>Rating: {value}</div>,
}))

jest.mock('primereact/chip', () => ({
  Chip: ({ label }) => <div data-testid='mock-chip'>{label}</div>,
}))

describe('RestaurantCard', () => {
  const mockSetShowDialog = jest.fn()
  const mockSetRestaurantId = jest.fn()
  const mockOnClickInfo = jest.fn()

  const mockRestaurant = {
    _id: '123',
    name: 'The Grand Restaurant',
    image: '123',
    averageRating: 4.5,
    cuisine: 'Italian',
    priceRange: 3,
    address: {
      city: 'Testville',
      state: 'TS',
      zipCode: '12345',
    },
    description: 'A fantastic place to dine.',
  }

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()
    useReviewDialog.mockReturnValue({
      setShowDialog: mockSetShowDialog,
      setRestaurantId: mockSetRestaurantId,
    })
    getPriceSigns.mockReturnValue('$$$')
  })

  it('renders restaurant information correctly', () => {
    render(<RestaurantCard data={mockRestaurant} onClickInfo={mockOnClickInfo} />)

    // Check if main info is rendered
    expect(screen.getByText('The Grand Restaurant')).toBeInTheDocument()
    expect(screen.getByText('Italian')).toBeInTheDocument()
    expect(
      screen.getByText('Testville TS 12345')
    ).toBeInTheDocument()
    expect(screen.getByText('A fantastic place to dine.')).toBeInTheDocument()

    // Check image
    const image = screen.getByAltText('The Grand Restaurant')
    expect(image).toBeInTheDocument()
    expect(image.src).toContain('https://picsum.photos/id/123/300/200')

    // Check rating
    expect(screen.getByTestId('mock-rating')).toHaveTextContent('Rating: 4.5')

    // Check price signs
    expect(getPriceSigns).toHaveBeenCalledWith(3)
    expect(screen.getByText('$$$')).toBeInTheDocument()
  })

  it('handles click on "More info" button', () => {
    render(<RestaurantCard data={mockRestaurant} onClickInfo={mockOnClickInfo} />)

    const moreInfoButton = screen.getByText('More info')
    fireEvent.click(moreInfoButton)

    expect(mockOnClickInfo).toHaveBeenCalledTimes(1)
    expect(mockOnClickInfo).toHaveBeenCalledWith('123')
  })

  it('handles click on "Add review" button', () => {
    render(<RestaurantCard data={mockRestaurant} onClickInfo={mockOnClickInfo} />)

    const addReviewButton = screen.getByText('Add review')
    fireEvent.click(addReviewButton)

    expect(mockSetShowDialog).toHaveBeenCalledTimes(1)
    expect(mockSetShowDialog).toHaveBeenCalledWith(true)
    expect(mockSetRestaurantId).toHaveBeenCalledTimes(1)
    expect(mockSetRestaurantId).toHaveBeenCalledWith('123')
  })

  it('renders correctly when averageRating is not provided', () => {
    const restaurantWithoutRating = { ...mockRestaurant, averageRating: undefined }
    render(
      <RestaurantCard
        data={restaurantWithoutRating}
        onClickInfo={mockOnClickInfo}
      />
    )

    expect(screen.getByTestId('mock-rating')).toHaveTextContent('Rating: 0')
  })

  it('renders correctly when description is long', () => {
    const longDescription = 'a'.repeat(200)
    const restaurantWithLongDescription = {
      ...mockRestaurant,
      description: longDescription,
    }
    render(
      <RestaurantCard
        data={restaurantWithLongDescription}
        onClickInfo={mockOnClickInfo}
      />
    )

    expect(screen.getByText(longDescription)).toBeInTheDocument()
  })
})
