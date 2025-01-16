import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      className="InputBox"
      type="text"
      placeholder="Search Pokémon..."
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
