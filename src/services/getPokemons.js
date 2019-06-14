// const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';
// const ENDPOINT = 'https://pokeapi.co/api/v2/?limit=25';

const getPokemons = url => fetch(`${url}`).then(response => response.json());

export { getPokemons };
