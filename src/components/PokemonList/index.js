import React, { Fragment } from 'react';
import Pokemon from '../Pokemon';
import './styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PokemonList({ pokemonList, filterBy }) {
  const filteredPokemons = pokemonList.filter(pokemon => pokemon.name.toUpperCase().includes(filterBy.toUpperCase()));
  return (
    <Fragment>
      {filteredPokemons.length > 0 ? (
        <ul className="pokemon__list">
          {filteredPokemons.map(pokemon => {
            return (
              <li className="pokemon__item" key={pokemon.id}>
                <Link to={`/pokemon/${pokemon.id}`} className="pokemon__link-page">
                  <Pokemon pokemonData={pokemon} />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="no__results">No results matching your search were found :(</div>
      )}
    </Fragment>
  );
}

PokemonList.propTypes = {
  filterBy: PropTypes.string,
  pokemonList: PropTypes.arrayOf(PropTypes.object)
};
