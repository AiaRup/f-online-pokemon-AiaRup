import React from 'react';
import Pokemon from '../Pokemon';
import './styles.scss';

export default function PokemonList({ pokemonList, filterBy }) {
  return (
    <ul className="pokemon__list">
      {pokemonList
        .filter(pokemon => pokemon.name.toUpperCase().includes(filterBy.toUpperCase()))
        .map(pokemon => {
          return (
            <li className="pokemon__item" key={pokemon.id}>
              <Pokemon pokemonData={pokemon} />
            </li>
          );
        })}
    </ul>
  );
}
