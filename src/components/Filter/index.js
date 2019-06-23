import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

export default function Filter({ filterBy, getUserValue }) {
  return (
    <form action="" className="page__form">
      <label htmlFor="name" className="form__label">
        Name
      </label>
      <input type="text" className="form__input" placeholder="Filtra pokemons por nombre..." id="name" value={filterBy} onChange={getUserValue} />
    </form>
  );
}

Filter.propTypes = {
  filterBy: PropTypes.string,
  getUserValue: PropTypes.func
};
