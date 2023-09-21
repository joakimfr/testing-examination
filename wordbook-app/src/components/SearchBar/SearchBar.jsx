

function SearchBar ({ searchTerm, setSearchTerm, getDictionary }) {

  return (
    <div>
      <input 
        type="text" 
        placeholder='Skriv ett ord'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        <button onClick={getDictionary}>ordbok</button>
      </div>
    )
  }

export default SearchBar