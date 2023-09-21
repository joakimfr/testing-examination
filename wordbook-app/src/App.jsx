import { useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import ShowResult from './components/ShowResult/ShowResult'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [searchTerm, setSearchTerm] = useState('')
console.log(searchTerm)

const handleSearch = () => {

}

async function getDictionary () {

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`;

  const response = await fetch(url)

  const data = await response.json();

  console.log(data)

}


  return (
    
   <div>
<SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  getDictionary={getDictionary}
 />
 <ShowResult />

   </div>
  )
}

export default App
