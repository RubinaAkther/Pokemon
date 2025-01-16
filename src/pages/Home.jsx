import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(20);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=200')
      .then((res) => res.json())
      .then((data) => {
        const pokemonUrls = data.results.map((pokemon) => pokemon.url);
        Promise.all(
          pokemonUrls.map((url) => fetch(url).then((res) => res.json()))
        ).then((pokemons) => {
          const typesSet = new Set();
          pokemons.forEach((pokemon) => {
            pokemon.types.forEach((type) => {
              typesSet.add(type.type.name);
            });
          });
          setTypes([...typesSet]);
          setPokemonList(pokemons);
          setFilteredPokemonList(pokemons);
        });
      });
  }, []);

  useEffect(() => {
    let filtered = pokemonList;

    if (selectedType !== 'all') {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPokemonList(filtered);
    setCurrentPage(1);
  }, [selectedType, searchTerm, pokemonList]);

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemons = filteredPokemonList.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="home-container">
      <div className="filter-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="filter-pokemon">
          <label htmlFor="type">Filter by Type:</label>
          <select id="type" value={selectedType} onChange={handleTypeChange}>
            <option value="all">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="pokemon-list">
        {currentPokemons.map((pokemon, index) => (
          <li key={index} className="pokemon-card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <h3 className="pokemonName">{pokemon.name}</h3>
            <p>
              Type: {pokemon.types.map((type) => type.type.name).join(', ')}
            </p>
            <Link to={`/pokemon/${pokemon.name}`}>
              <button>View Details</button>
            </Link>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPokemon >= filteredPokemonList.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
