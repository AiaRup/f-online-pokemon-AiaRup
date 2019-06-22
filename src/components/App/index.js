import React, { Component } from 'react';
import './styles.scss';
import { getPokemons } from '../../services/getPokemons';
import { Route, Switch, Redirect } from 'react-router-dom';
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
    this.clearFilter = this.clearFilter.bind(this);
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

  clearFilter() {
    this.setState({ filterBy: '' });
  }

  render() {
    const { pokemonList, filterBy } = this.state;
    return (
      <div className="page">
        <div className="page__wrapper">
          <Switch>
            <Route exact path="/home" render={() => <Home filterBy={filterBy} pokemonList={pokemonList} getUserValue={this.getUserValue} />} />
            <Route exac path="/pokemon/:id" render={routerProps => <PokemonDetails id={routerProps.match.params.id} pokemonList={pokemonList} clearFilter={this.clearFilter} />} />
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
