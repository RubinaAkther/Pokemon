import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (pokemon) => {
    setFavorites((prev) => [...prev, pokemon]);
  };

  const removeFavorite = (name) => {
    setFavorites((prev) => prev.filter((pokemon) => pokemon.name !== name));
  };

  const isFavorite = (name) => {
    return favorites.some((pokemon) => pokemon.name === name);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
