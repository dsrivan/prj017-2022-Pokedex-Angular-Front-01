const fncatchOut = (error) => console.error(error);
const fnFinallyOut = () => {};

const config = {
  elements: {
    olPokemons: document.querySelector('ol.pokemons'),
    buttonLoadMore: document.querySelector('button'),
  },
  max: 150,
  offset: 0,
  limit: 10,
}

const convertPokemonToLi = (pokemon) => {
  return `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>
              <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
          </li>`;
}

const insertPokemonLi = (pokemonsList) => config.elements.olPokemons.innerHTML += pokemonsList;

const loadPokemonItems = (offset, limit) => {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    config.elements.olPokemons.innerHTML += newHtml;
  })
    .catch(fncatchOut)
    .finally(fnFinallyOut);
}

loadPokemonItems(config.offset, config.limit);

config.elements.buttonLoadMore.addEventListener('click', () => {
  config.offset += config.limit;

  const qtdRecordsNextPage = config.offset + config.limit;

  if (qtdRecordsNextPage >= config.max) {
    const newLimit = config.max - config.offset;
    loadPokemonItems(config.offset, newLimit);

    config.elements.buttonLoadMore.parentElement.remove(config.elements.buttonLoadMore);
  } else {
    loadPokemonItems(config.offset, config.limit);
  }

});

//http-server ./