import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

describe('Footer', () => {
  test('renders the copyright notice', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    const expectedText = `Angel Hernandez ©${currentYear}`
    const footerText = screen.getByText(expectedText)
    expect(footerText).toBeInTheDocument()
  })
})
