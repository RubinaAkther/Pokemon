import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css';

const PokemonCard = ({ name, imageUrl }) => (
  <div className="pokemon-card">
    <img src={imageUrl} alt={name} />
    <h3>{name}</h3>
    <Link to={`/pokemon/${name}`}>View Details</Link>
  </div>
);

export default PokemonCard;
