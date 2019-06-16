import React, { Component } from 'react';
import './styles.scss';
import { getPokemons } from '../../services/getPokemons';
import PokemonList from '../PokemonList';
import Filter from '../Filter';
import ballImage from '../../images/pokemon-image.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonList: [],
      filterBy: ''
    };
    this.urlApi = 'https://pokeapi.co/api/v2/pokemon/?limit=25';
    this.getUserValue = this.getUserValue.bind(this);
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('pokeList'));
    if (!localData) {
      getPokemons(this.urlApi).then(data => {
        const promises = data.results.map(result => getPokemons(result.url));
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

  getUserValue({ target: { value } }) {
    this.setState({ filterBy: value });
  }

  render() {
    const { pokemonList, filterBy } = this.state;
    return (
      <div className="page">
        <div className="page__wrapper">
          <header className="page__header">
            <img src={ballImage} alt="pokemon ball" className="header__image" />
            <h1 className="page__title">PokeDex</h1>
          </header>
          <main className="page__main">
            <Filter filterBy={filterBy} getUserValue={this.getUserValue} />
            <PokemonList pokemonList={pokemonList} filterBy={filterBy} />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
