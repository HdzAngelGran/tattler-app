
import { render, screen } from '@testing-library/react';
import ReviewCard from '../components/ReviewCard';

// Mock PrimeReact components
jest.mock('primereact/panel', () => ({
  Panel: ({ header, children }) => (
    <div data-testid="mock-panel">
      <div data-testid="mock-panel-header">{header}</div>
      <div>{children}</div>
    </div>
  ),
}));

jest.mock('primereact/rating', () => ({
  Rating: ({ value, cancel, readOnly }) => (
    <div data-testid="mock-rating">
      Rating: {value}
      {cancel && <span>cancel</span>}
      {readOnly && <span>readOnly</span>}
    </div>
  ),
}));

describe('ReviewCard', () => {
  const mockReview = {
    _id: '60d21b4667d0d8992e610c85',
    comment: 'This place is great!',
    rating: 5,
    createdBy: {
      _id: '60d21b4667d0d8992e610c84',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  };

  it('renders review information correctly', () => {
    render(<ReviewCard review={mockReview} />);

    // Check if reviewer's name is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Check if reviewer's email is rendered
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();

    // Check if comment is rendered
    expect(screen.getByText('This place is great!')).toBeInTheDocument();

    // Check if rating is rendered correctly
    const rating = screen.getByTestId('mock-rating');
    expect(rating).toHaveTextContent('Rating: 5');
    expect(rating).toHaveTextContent('readOnly');
    expect(rating).not.toHaveTextContent('cancel');
  });

  it('renders all header information', () => {
    render(<ReviewCard review={mockReview} />);
    const header = screen.getByTestId('mock-panel-header');
    expect(header).toHaveTextContent('John Doe');
    expect(header).toContainElement(screen.getByTestId('mock-rating'));
  });
});
