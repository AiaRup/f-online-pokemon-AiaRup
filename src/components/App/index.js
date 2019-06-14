import React, { Component } from 'react';
import './styles.scss';
import { getPokemons } from '../../services/getPokemons';
import Pokemon from '../Pokemon';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonList: []
    };
    this.urlApi = 'https://pokeapi.co/api/v2/pokemon/?limit=25';
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('pokeList'));
    if (!localData) {
      const promises = [];
      getPokemons(this.urlApi).then(data => {
        for (const result of data.results) {
          promises.push(getPokemons(result.url));
        }
        Promise.all(promises).then(responses => {
          const pokemons = [];
          for (const response of responses) {
            pokemons.push(response);
          }
          this.setState({ pokemonList: pokemons });
          localStorage.setItem('pokeList', JSON.stringify(pokemons));
        });
      });
    } else {
      this.setState({ pokemonList: localData });
    }
  }

  render() {
    const { pokemonList } = this.state;
    return (
      <div className="page">
        <ul className="pokemon__list">
          {pokemonList.map(pokemon => {
            return (
              <li className="pokemon__item" key={pokemon.id}>
                <Pokemon pokemonData={pokemon} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
