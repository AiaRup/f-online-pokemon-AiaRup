import React, { Component } from 'react';
import './styles.scss';
import { getPokemons } from '../../services/getPokemons';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonList: []
    };
  }

  componentDidMount() {
    const promises = [];
    for (let i = 1; i <= 25; i++) {
      promises.push(getPokemons(i));
    }
    Promise.all(promises).then(responses => {
      for (const response of responses) {
        console.log(response);
      }
    });
  }
  render() {
    return <div className="App">app</div>;
  }
}

export default App;
