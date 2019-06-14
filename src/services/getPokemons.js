const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

const getPokemons = id => fetch(`${ENDPOINT}${id}`).then(response => response.json());

export { getPokemons };
