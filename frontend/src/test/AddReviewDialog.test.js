import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddReviewDialog from '../components/AddReviewDialog'
import useReviewDialog from '../hook/useReviewDialog'
import useSubmitReview from '../hook/useSubmitReview'

jest.mock('../hook/useReviewDialog', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../hook/useSubmitReview', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockUseReviewDialog = useReviewDialog
const mockUseSubmitReview = useSubmitReview

describe('AddReviewDialog', () => {
  let setShowDialog
  let mutate

  beforeEach(() => {
    setShowDialog = jest.fn()
    mutate = jest.fn()
    mockUseReviewDialog.mockReturnValue({
      restaurantId: '123',
      setRestaurantId: jest.fn(),
      showDialog: true,
      setShowDialog
    })
    mockUseSubmitReview.mockReturnValue({
      mutate,
      isLoading: false
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the dialog with header', () => {
    render(<AddReviewDialog />)
    expect(screen.getByText('Add review')).toBeInTheDocument()
  })

  test('submit button is disabled when rating is 0', () => {
    render(<AddReviewDialog />)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
  })

  test('submit button is enabled when a rating is given', async () => {
    render(<AddReviewDialog />)
    await waitFor(() => {
      expect(document.querySelectorAll('[data-pc-section="item"]').length).toBeGreaterThan(0)
    })
    const ratingStars = document.querySelectorAll('[data-pc-section="item"]')
    fireEvent.click(ratingStars[2]) // Select 3 stars
    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled()
  })

  test('calls setShowDialog with false when cancel button is clicked', () => {
    render(<AddReviewDialog />)
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(setShowDialog).toHaveBeenCalledWith(false)
  })

  test('updates comment state on textarea change', () => {
    render(<AddReviewDialog />)
    const commentTextarea = screen.getByRole('textbox')
    fireEvent.change(commentTextarea, { target: { value: 'Great food!' } })
    expect(commentTextarea.value).toBe('Great food!')
  })

  test('calls submitReview.mutate on submit with correct data', async () => {
    render(<AddReviewDialog />)
    await waitFor(() => {
      expect(document.querySelectorAll('[data-pc-section="item"]').length).toBeGreaterThan(0)
    })
    const ratingStars = document.querySelectorAll('[data-pc-section="item"]')
    fireEvent.click(ratingStars[4]) // 5 stars

    const commentTextarea = screen.getByRole('textbox')
    fireEvent.change(commentTextarea, { target: { value: 'Amazing!' } })

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(mutate).toHaveBeenCalledWith(
      {
        restaurantId: '123',
        payload: { rating: 5, comment: 'Amazing!' }
      },
      expect.any(Object)
    )
  })

  test('shows error message on submission failure', async () => {
    const errorMessage = 'Failed to post review'
    mutate.mockImplementation((_, { onError }) => {
      onError({ message: errorMessage })
    })

    render(<AddReviewDialog />)
    await waitFor(() => {
      expect(document.querySelectorAll('[data-pc-section="item"]').length).toBeGreaterThan(0)
    })
    const ratingStars = document.querySelectorAll('[data-pc-section="item"]')
    fireEvent.click(ratingStars[3]) // 4 stars

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  test('resets and closes dialog on submission success', async () => {
    mutate.mockImplementation((_, { onSuccess }) => {
      onSuccess()
    })

    render(<AddReviewDialog />)
    await waitFor(() => {
      expect(document.querySelectorAll('[data-pc-section="item"]').length).toBeGreaterThan(0)
    })
    const ratingStars = document.querySelectorAll('[data-pc-section="item"]')
    fireEvent.click(ratingStars[3]) // 4 stars

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => {
      expect(setShowDialog).toHaveBeenCalledWith(false)
    })
  })

  test('does not render dialog when showDialog is false', () => {
    mockUseReviewDialog.mockReturnValue({
      ...useReviewDialog(),
      showDialog: false
    })
    const { container } = render(<AddReviewDialog />)
    expect(container.firstChild).toBeNull()
  })

  test('closes dialog on hide', () => {
    render(<AddReviewDialog />)
    const closeButton = screen.getByLabelText('Close')
    fireEvent.click(closeButton)
    expect(setShowDialog).toHaveBeenCalledWith(false)
  })
})
