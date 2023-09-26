import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import ShowResult from './components/ShowResult/ShowResult'
import Header from './components/Header/Header'




import './App.scss'

function App() {
  
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')

console.log(searchResult)


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
    console.log(data);
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
      searchTerm={searchTerm}
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
