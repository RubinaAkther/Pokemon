import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavorites } from '../FavoritesContext';
import axios from 'axios';
import './PokemonDetails.css';

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemon(response.data);
      setLoading(false);
    };

    fetchPokemonDetails();
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (!pokemon) return <div>Pokémon not found</div>;

  const { sprites, abilities, types, stats } = pokemon;

  return (
    <div className="pokemon-details">
      <div className="pokemon-details-title">
        <h1>{pokemon.name.toUpperCase()}</h1>
        <img src={sprites.front_default} alt={pokemon.name} />
      </div>

      <div className="pokemon-content">
        <div className="details-section">
          <h2>Abilities</h2>
          <ul>
            {abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>

        <div className="details-section">
          <h2>Types</h2>
          <ul>
            {types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
        </div>

        <div className="details-section">
          <h2>Base Stats</h2>
          <ul>
            {stats.map((stat, index) => (
              <li key={index}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>

        <button
          className={`favorite-button ${
            isFavorite(pokemon.name) ? 'remove' : 'add'
          }`}
          onClick={() =>
            isFavorite(pokemon.name)
              ? removeFavorite(pokemon.name)
              : addFavorite({
                  name: pokemon.name,
                  imageUrl: sprites.front_default,
                })
          }
        >
          {isFavorite(pokemon.name) ? 'Remove Favorite' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default PokemonDetails;
