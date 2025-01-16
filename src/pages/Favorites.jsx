import React from 'react';
import { useFavorites } from '../FavoritesContext';
import './Favorites.css';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="favorites">
      <h1>Your Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p>No favorite Pokémon yet!</p>
      ) : (
        <div className="pokemon-grid">
          {favorites.map((pokemon) => (
            <div key={pokemon.name} className="pokemon-card">
              <img src={pokemon.imageUrl} alt={pokemon.name} />
              <h3>{pokemon.name.toUpperCase()}</h3>
              <button
                className="remove-favorite-button"
                onClick={() => removeFavorite(pokemon.name)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
