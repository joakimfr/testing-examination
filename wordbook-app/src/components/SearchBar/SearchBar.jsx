import './SearchBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function SearchBar ({ searchTerm, setSearchTerm, getDictionary }) {
 


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