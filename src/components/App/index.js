import React, { Component } from 'react';
import './styles.scss';
import { getPokemons } from '../../services/getPokemons';
import { Route, Switch } from 'react-router-dom';
import PokemonDetails from '../PokemonDetails';
import Home from '../Home';

const amountPokemons = 25;
const urlApi = `https://pokeapi.co/api/v2/pokemon/?limit=${amountPokemons}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonList: [],
      filterBy: ''
    };
    this.getUserValue = this.getUserValue.bind(this);
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('pokeList'));
    if (!localData) {
      getPokemons(urlApi)
        .then(data => {
          data.results.forEach(pokemon => {
            getPokemons(pokemon.url).then(pokemon => {
              let pokemonData = pokemon;
              getPokemons(pokemon.species.url).then(moreData => {
                pokemonData = { ...pokemonData, ...moreData };
                this.setState(
                  prevState => {
                    return { pokemonList: [...prevState.pokemonList, pokemonData] };
                  },
                  () => this.orderAndSaveToLocal(this.state.pokemonList)
                );
              });
            });
          });
        })
        .catch(error => console.log('error', error));
    } else {
      this.setState({ pokemonList: localData });
    }
  }

  orderAndSaveToLocal(array) {
    if (array.length === amountPokemons) {
      array.sort((pokemonA, pokemonB) => pokemonA.id - pokemonB.id);
      this.setState({ pokemonList: array });
      localStorage.setItem('pokeList', JSON.stringify(array));
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
          <Switch>
            <Route exact path="/" render={() => <Home filterBy={filterBy} pokemonList={pokemonList} getUserValue={this.getUserValue} />} />
            <Route path="/pokemon/:id" render={routerProps => <PokemonDetails id={routerProps.match.params.id} pokemonList={pokemonList} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
