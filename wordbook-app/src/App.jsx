import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import ShowResult from './components/ShowResult/ShowResult'
import Header from './components/Header/Header'
import './App.scss'

function App() {
  

  //I min app har jag två stycken useStates och en funktion getDictionary för att anropa API:et. 
  //Jag hämtar props från min komponent SearchBar.jsx för att kunna uppdatera min searchTerm med ordet som användaren skriver in.
  //funktionen getDictionary triggas när användaren trycker på button som inns i SearchBar.jsx
  //searchTerm skickas med i URL:en som gör ett anrop till mitt API.
  //om det inte visas något felmeddelande så uppdateras searchResult med datan som jag får från mitt API.
  //Datan som jag får tillbaka skickar jag som props till ShowResult.jsx

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')

  
async function getDictionary() {

  if (!searchTerm) {
    setErrorMessage('Please enter a word before searching.');
    return;
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      setErrorMessage('No results found. Please check your spelling and try again.'); 
      return; 
    }

    const data = await response.json();

    setSearchResult(data);
    setErrorMessage('');
  } catch (error) {
    setErrorMessage('Please try again later.'); 
  }
}

  return (
    <div className='app'>
    <Header />
    <SearchBar
      searchTerm={searchTerm} //skickar med searchTerm för att kunna uppdatera den i min komponent som har ett inputfield.
      setSearchTerm={setSearchTerm}
      getDictionary={getDictionary}
    />
      <p className='app__message' data-testid='error-message'>{errorMessage}</p>
    <ShowResult
      searchResult={searchResult}
    />
  </div>
)
}

export default App
