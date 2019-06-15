import React from 'react';

export default function Filter({filterBy, getUserValue}) {
  return (
    <form className="page__form">
      <label htmlFor="name" className="form__label">
        Name
      </label>
      <input type="text" className="form__input" placeholder="Filtra pokemons por nombre" id="name" value={filterBy} onChange={getUserValue}/>
    </form>
  );
}
