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

  it('should render phonetic information from mock data', () => {
    render(<ShowResult searchResult={mockDictionary} />);
      const text = screen.queryByText('hə`ləʊ');
      const audios = screen.queryAllByTestId('audio')

      expect(text).toBeInTheDocument(); 
      expect(audios.length).toBeGreaterThan(0); //Skrev såhär för att det kan finnas flera audios, i detta fallet finns det 2 stycken i min mockade data.
  });
  
  it('should not render phonetics block when there is no audio', () => {  // mockade ny data med en tom phonetics-array för att kunna testa om det inte finns med någon audio
    const mockDataWithoutAudio = [
      {
        word: 'test',
        phonetics: [], 
        meanings: [],
      },
    ];
  
    render(<ShowResult searchResult={mockDataWithoutAudio} />);
    const audios = screen.queryAllByTestId('audio');
  
    expect(audios.length).toBe(0); 
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
    expect(message).toBeNull(); 
  });
})

