import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FavoritesProvider } from './FavoritesContext';
import './theme.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>
);
