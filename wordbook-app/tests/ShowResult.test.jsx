import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowResult from '../src/components/ShowResult/ShowResult';
import mockDictionary from './mockDictionary.json'

describe('Render mockdata', () => {
  it('should render the word from mock data', () => {
    const { getByText } = render(<ShowResult searchResult={mockDictionary} />);
    expect(getByText('hello')).toBeInTheDocument(); 
  });

  it('should render phonetic information from mock data', () => {
    const { getByText, queryAllByRole } = render(<ShowResult searchResult={mockDictionary} />);
    expect(getByText('hə`ləʊ')).toBeInTheDocument(); 
    const audio = queryAllByRole('audio'); 
    expect(audio.length).toBeGreaterThanOrEqual(0); 
  });
 
  it('should render meanings from mock data', () => {
    const { getByText } = render(<ShowResult searchResult={mockDictionary} />);
    expect(getByText('Part of Speech: exclamation')).toBeInTheDocument(); 
    expect(getByText('Definition: used as a greeting or to begin a phone conversation.')).toBeInTheDocument();
   
    expect(getByText('Example: hello there, Katie!')).toBeInTheDocument();
  });
});

describe('message in ShowResult', () => {
  it('should display the message when there are no search results', () => {
    const { getByText } = render(<ShowResult searchResult={[]} />);
    const message = getByText('Discover the meaning of words by typing and pressing the button.');
    expect(message).toBeInTheDocument();
  });

  it('should hide the message when there are search results', () => {
    const { queryByText } = render(<ShowResult searchResult={mockDictionary} />);
    const message = queryByText('Discover the meaning of words by typing and pressing the button.');
    expect(message).toBeNull();
  });


})

