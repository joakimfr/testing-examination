import SearchBar from "../src/components/SearchBar/SearchBar";
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
  


describe('SearchBar elements', () => {  
  it('should render an input element', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('search');
    expect(input).toBeInTheDocument();
  });

  it('should render a button element', () => {
    render(<SearchBar />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});

describe('Interraction', () => {
  it('should let the user type in input and update searchTerm', () => {
    const setSearchTerm = vi.fn();
    const { getByPlaceholderText } = render(
      <SearchBar searchTerm="" setSearchTerm={setSearchTerm} />
    );
  
    const input = getByPlaceholderText('search');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(setSearchTerm).toHaveBeenCalledWith('test');
  });
  
  it('should call getDictionary when the button is clicked', async () => {
   const getDictionary = vi.fn();
    render(<SearchBar searchTerm="" setSearchTerm={() => {}} getDictionary={getDictionary} />);
    const button = screen.getByRole('button');

    await userEvent.click(button);
    expect(getDictionary).toHaveBeenCalled();
  });

  
});