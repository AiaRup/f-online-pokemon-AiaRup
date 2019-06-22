import React, { Component, Fragment } from 'react';
import Loading from '../Loading';
import './styles.scss';
import { icons } from '../../utils/typeIcons';

class PokemonDetails extends Component {
  componentWillUnmount() {
    this.props.clearFilter();
  }

  render() {
    const { id, pokemonList } = this.props;
    const pokemon = pokemonList.find(item => item.id === parseInt(id));
    return (
      <Fragment>
        {pokemonList.length ? (
          <div className="pokemon__details-wrapper">
            <div className="details__card">
              <img src={pokemon.sprites.front_shiny} alt={pokemon.name} className="details__image" />
              <h1 className="details__name" style={{ borderBottom: `4px solid ${pokemon.color.name}` }}>
                {pokemon.name}
              </h1>
              <div className="pokemon__data-wrapper">
                <div className="data__container">
                  <span className="data__content">{pokemon.height / 10}m</span>
                  <span className="data__type">height</span>
                </div>
                <div className="data__container">
                  <span className="data__content-image">
                    {pokemon.types.map(pokemonType => (
                      <img className="type__image" src={icons[pokemonType.type.name]} alt={pokemonType.type.name} />
                    ))}
                  </span>
                  <span className="data__content-types">
                    {pokemon.types.map((pokemonType, index) => {
                      if (index) {
                        return <span className="data__type"> / {pokemonType.type.name}</span>;
                      }
                      return <span className="data__type">{pokemonType.type.name}</span>;
                    })}
                  </span>
                </div>
                <div className="data__container">
                  <span className="data__content">{pokemon.weight / 10}kg</span>
                  <span className="data__type">weight</span>
                </div>
              </div>

              <div>habitat {pokemon.habitat.name}</div>
              <ul className="details__abilities">
                {pokemon.stats.map((abilityType, index) => (
                  <li className="details__ability" key={index}>
                    <div class="pie-wrapper pie-wrapper--solid progress-88">
                      <span class="label">
                        {abilityType.base_stat}
                        <span class="smaller">%</span>
                      </span>
                    </div>
                    {abilityType.stat.name}
                  </li>
                ))}
              </ul>
              {/* <ul className="details__abilities">
                {pokemon.abilities.map((abilityType, index) => (
                  <li className="details__ability" key={index}>
                    <div class="pie-wrapper pie-wrapper--solid progress-88">
                      <span class="label">
                        88<span class="smaller">%</span>
                      </span>
                    </div>
                    {abilityType.ability.name}
                  </li>
                ))}
              </ul> */}
              <div className="images__container">
                <img src={pokemon.sprites.back_default} alt={pokemon.name} />
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </Fragment>
    );
  }
}

export default PokemonDetails;
