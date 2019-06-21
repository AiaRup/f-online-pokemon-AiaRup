import React from 'react';
import './styles.scss';

export default function Pokemon({ pokemonData: { id, name, sprites, types, evolves_from_species } }) {
  return (
    <div className="pokemon__card">
      <div className="pokemon__header">
        <div className="pokemon__image-container" style={{ backgroundImage: `url(${sprites.front_shiny})` }}>
          <img className="pokemon__image" src={sprites.front_shiny} alt={name} />
        </div>
        <span className="pokemon__id">id / {id}</span>
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
        {evolves_from_species ? (
          <div className="pokemon__evolution">
            <span className="evolution__title">Evoluciona de:</span>
            <span className="evolution__name">{evolves_from_species.name}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
