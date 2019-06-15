const getPokemons = url => fetch(`${url}`).then(response => response.json());

export { getPokemons };
