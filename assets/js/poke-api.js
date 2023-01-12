const fncatchInner = (error) => console.error(error);
const fnFinallyInner = () => { };

const convertPokeApiDetailToPokemonModel = (pokeDetail) => {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

const pokeApi = {
  getPokemonsDetails: async (pokemon) => {
    return await fetch(pokemon.url)
      .then((response) => response.json())
      .then(convertPokeApiDetailToPokemonModel);
  },

  getPokemons: async (offset = config.offset, limit = config.limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return await fetch(url)
      .then((response) => response.json())
      .then((response) => response.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
      .then((detailsPokemons) => Promise.all(detailsPokemons))
      .then((pokemonsWithDetails) => pokemonsWithDetails)
      .catch(fncatchInner)
      .finally(fnFinallyInner);
  }
}