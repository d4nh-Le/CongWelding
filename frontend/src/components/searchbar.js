import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './searchbar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log('searching for:', searchTerm); // replace with actual search functionality
    try {
      const response = await fetch(`products/${searchTerm}`);
      const searchResults = await response.json();
      return searchResults;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search"
        className="searchbar-input"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button type="submit" className="searchbar-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}

export default SearchBar;
