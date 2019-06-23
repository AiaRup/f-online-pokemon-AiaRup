import React from 'react';
import Pokemon from '../Pokemon';
import './styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PokemonList({ pokemonList, filterBy }) {
  return (
    <ul className="pokemon__list">
      {pokemonList
        .filter(pokemon => pokemon.name.toUpperCase().includes(filterBy.toUpperCase()))
        .map(pokemon => {
          return (
            <li className="pokemon__item" key={pokemon.id}>
              <Link to={`/pokemon/${pokemon.id}`} className="pokemon__link-page">
                <Pokemon pokemonData={pokemon} />
              </Link>
            </li>
          );
        })}
    </ul>
  );
}

PokemonList.propTypes = {
  filterBy: PropTypes.string,
  pokemonList: PropTypes.arrayOf(PropTypes.object)
};
