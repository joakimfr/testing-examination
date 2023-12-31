import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../src/App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockDictionary from './mockDictionary.json'


export const handlers = [
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/hello', (req, res, ctx) => {
  
    return res(ctx.json(mockDictionary));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());



describe('Error messages', () => {
  it('should display error message if button is pressed without text', async () => {
    render(<App />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const message = await screen.findByText('Please enter a word before searching.');
    expect(message).toBeInTheDocument();
  });

  it('should display error message on misspelled word', async () => {
    server.use(
      rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/helloq', (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ message: 'word not found' }));
      })
    );
  
    render(<App />);
    const button = screen.getByRole('button');
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();
  
    await user.type(input, 'helloq');
    userEvent.click(button);
  
    const message = await screen.findByText('No results found. Please check your spelling and try again.');
    expect(message).toBeInTheDocument();
  });
  

  it('should display error message on API response error', async () => {
    server.use(
      rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/hello', (req, res, ctx) => {
        return res(ctx.status(200), ctx.text('this is not valid JSON'));
      })
    );
  
    render(<App />);
    const button = screen.getByTestId('search-button');
    const input = screen.getByRole('textbox');
    const user = userEvent.setup()

    await user.type(input, 'hello');
    userEvent.click(button);
  
    const message = await screen.findByText('Please try again later.');
    expect(message).toBeInTheDocument();
  });
});