import React, { Component } from 'react';
import './styles.scss';
import { getPokemons } from '../../services/getPokemons';

import { Route, Switch } from 'react-router-dom';
import PokemonDetails from '../PokemonDetails';
import Home from '../Home';

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
        Promise.all(promises)
          .then(responses => {
            const pokemons = [];
            for (const response of responses) {
              pokemons.push(response);
            }
            this.setState({ pokemonList: pokemons });
            localStorage.setItem('pokeList', JSON.stringify(pokemons));
          })
          .catch(error => console.log('error', error));
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
