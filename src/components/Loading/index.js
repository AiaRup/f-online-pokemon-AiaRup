import React from 'react';
import ballImage from '../../images/pokemon-image.png';

export default function Loading() {
  return (
    <div className="loading__container">
      <p className="loading__text">Loading...</p>
      <img src={ballImage} alt="loading pokemons" className="loading__image" />
    </div>
  );
}
