import { useState } from 'react';

const SearchField = ({setSearchPhrase}) => {
  const [query, setQuery] = useState('');

  function handleTextfieldChange(event) {
    setQuery(event.target.value);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    setQuery(query.trim());
    setSearchPhrase(query);

  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} required onChange={handleTextfieldChange}></input>
        <input type="submit" value="Snoop"></input>
      </form>
    </div>
  )
}
export default SearchField