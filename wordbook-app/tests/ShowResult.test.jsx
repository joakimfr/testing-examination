import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowResult from '../src/components/ShowResult/ShowResult';
import mockDictionary from './mockDictionary.json'



describe('Render mockdata', () => {
  it('should render the word from mock data', () => {
    render(<ShowResult searchResult={mockDictionary} />);
    const word = screen.queryByText('hello'); 
    expect(word).toBeInTheDocument();
  });
//ändra till test id på audio
  it('should render phonetic information from mock data', () => {
    const { getByText, queryAllByRole } = render(<ShowResult searchResult={mockDictionary} />);
    expect(getByText('hə`ləʊ')).toBeInTheDocument(); 
    const audio = queryAllByRole('audio'); 
    expect(audio.length).toBeGreaterThanOrEqual(0); 
  });
 
  it('should render meanings from mock data', () => {
    render(<ShowResult searchResult={mockDictionary} />);
    const speech = screen.queryByText('Part of Speech: exclamation')
    const definition = screen.queryByText('Definition: used as a greeting or to begin a phone conversation.')
    const example = screen.queryByText('Example: hello there, Katie!')
    expect(speech).toBeInTheDocument();
    expect(definition).toBeInTheDocument();
    expect(example).toBeInTheDocument();
  });
});

describe('message in ShowResult', () => {
  it('should display the message when there are no search results', () => {
    render(<ShowResult searchResult={[]} />);
    const message = screen.queryByText('Discover the meaning of words by typing and pressing the button.');
    expect(message).toBeInTheDocument();
  });

  it('should hide the message when there are search results', () => {
    render(<ShowResult searchResult={mockDictionary} />);
    const message = screen.queryByText('Discover the meaning of words by typing and pressing the button.');
    expect(message).toBeNull(); //ändra på övre också till screen querybttext
  });


})

