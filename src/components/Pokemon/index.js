import React from 'react';

export default function Pokemon({ pokemonData: { id, name, sprites, types } }) {
  return (
    <div className="pokemon__card">
      <div className="pokemon__header">
        <img className="pokemon__image" src={sprites.front_shiny} alt={name} />
        <span className="pokemon__id">ID/{id}</span>
      </div>
      <div className="pokemon__main">
        <h2 className="pokemon__title">{name}</h2>
        <ul className="pokemon__types">
          {types.map((pokemonType, index) => (
            <li className="pokemon__type" key={index}>
              {pokemonType.type.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
