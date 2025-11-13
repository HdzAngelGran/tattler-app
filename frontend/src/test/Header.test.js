import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn()
}))

const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    )
  })
}

describe('Header', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the logo', () => {
    useAuth.mockReturnValue({ isAuthenticated: false })
    renderWithRouter(<Header />)
    const logo = screen.getByText('tattler')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '/')
  })

  test('shows Login and Signup buttons when not authenticated and not on login page', () => {
    useAuth.mockReturnValue({ isAuthenticated: false })
    renderWithRouter(<Header />, { route: '/' })
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Signup')).toBeInTheDocument()
  })

  test('does not show Login and Signup buttons when on login page', () => {
    useAuth.mockReturnValue({ isAuthenticated: false })
    renderWithRouter(<Header />, { route: '/login' })
    expect(screen.queryByText('Login')).not.toBeInTheDocument()
    expect(screen.queryByText('Signup')).not.toBeInTheDocument()
  })

  test('shows Logout button when authenticated', () => {
    useAuth.mockReturnValue({ isAuthenticated: true })
    renderWithRouter(<Header />)
    expect(screen.getByText('Logout')).toBeInTheDocument()
    expect(screen.queryByText('Login')).not.toBeInTheDocument()
    expect(screen.queryByText('Signup')).not.toBeInTheDocument()
  })

  test('calls logout function on click', () => {
    const logoutMock = jest.fn()
    useAuth.mockReturnValue({ isAuthenticated: true, logout: logoutMock })
    renderWithRouter(<Header />)
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)
    expect(logoutMock).toHaveBeenCalledTimes(1)
  })
})
