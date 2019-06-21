import React, { Component } from 'react';

class PokemonDetails extends Component {
  render() {
    const { id } = this.props;
    return (
      <div>
        pokemon details id {id}
        <div>altura</div>
        <div>peso</div>
        <div>habilidades</div>
        <div>imágenes del pokemon y sus evoluciones</div>
      </div>
    );
  }
}

export default PokemonDetails;
