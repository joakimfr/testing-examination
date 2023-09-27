import './SearchBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function SearchBar ({ searchTerm, setSearchTerm, getDictionary }) {
 
//Här har jag valt att göra en komponent för att hantera input och button. Jag tar emot props från app.jsx. Mitt inputfield tar det användaren skriver och sparar det i min useState searchTerm. Min knapp kör funktionen handleSearch som getDictionary ligger i. getDictionary tar skickar med searchTerm i en url som gör api-anropet för att få tilbaka datan från användarens ord.

  const handleSearch = () => {

    getDictionary();
   
  }

  return (
    <div className='searchbar'>
      <input 
        className='searchbar__input'
        type="text" 
        placeholder='search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        <button className='searchbar__button' data-testid='search-button' onClick={handleSearch}>
        <FontAwesomeIcon className='searchbar__icon' icon={faMagnifyingGlass} />
        </button>
      </div>
    )
  }

export default SearchBar