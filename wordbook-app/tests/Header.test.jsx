import Header from "../src/components/Header/Header";
import { render, screen } from '@testing-library/react';

it('should render the Header component', () => {
  render(<Header />);
  const title = screen.getByText('Dictionary');
  const icon = screen.getByTestId('book-icon');
  expect(title).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});