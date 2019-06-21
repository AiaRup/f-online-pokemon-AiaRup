import React, { Fragment } from 'react';
import PokemonList from '../PokemonList';
import Filter from '../Filter';
import ballImage from '../../images/pokemon-image.png';

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
          <div className="loading__container">
            <p className="loading__text">Loading...</p>
            <img src={ballImage} alt="loading pokemons" className="loading__image" />
          </div>
        )}
      </main>
    </Fragment>
  );
}
