import React, { Fragment } from 'react';
import PokemonList from '../PokemonList';
import Filter from '../Filter';
import ballImage from '../../images/pokemon-image.png';
import Loading from '../Loading';
import './styles.scss';
import PropTypes from 'prop-types';

export default function Home({ filterBy, pokemonList, getUserValue }) {
  return (
    <Fragment>
      <header className="page__header">
        <img src={ballImage} alt="pokemon ball" className="header__image" />
        <h1 className="page__title">PokeDex</h1>
      </header>

      <main className="page__main">
        {pokemonList.length ? (
          <Fragment>
            <Filter filterBy={filterBy} getUserValue={getUserValue} />
            <PokemonList pokemonList={pokemonList} filterBy={filterBy} />
          </Fragment>
        ) : (
          <Loading />
        )}
      </main>
    </Fragment>
  );
}

Home.propTypes = {
  filterBy: PropTypes.string,
  getUserValue: PropTypes.func,
  pokemonList: PropTypes.arrayOf(PropTypes.object)
};
