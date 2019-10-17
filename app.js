// NEED A LOADING SCREEN

// LIST ALL POKEMON IN THE POKEDEX
const pokedex = 'https://pokeapi.co/api/v2/pokedex/2';

fetch(pokedex)
  .then(x => x.json())
  .then(x => {
    // Display Pokemon in a list
    x.pokemon_entries.forEach(function(obj) {
      let pokemonURL = "";
      pokemonURL = 'https://pokeapi.co/api/v2/pokemon/' + obj.entry_number;
      
      fetch(pokemonURL)
        .then(x => x.json())
        .then(x => {
          // Display Pokemon on the page
          insertPokemonCard(x. name, x.sprites.front_default, x.id);
        })
    })
  })
  .catch(err => {
    console.log(err || "this is an error");
  })


/**
 * Inserts a div onto page with the Pokemon's name and image.
 * @param {string} name The Pokemon's name.
 * @param {string} imgUrl The image URL for the Pokemon's default sprite.
 * @param {number} pokemonId The Pokemon's Pokedex ID.
 */
function insertPokemonCard(name, imgUrl, pokemonId) {

  // Get parent container
  const parent = document.querySelector('#pokemon-container');

  // DIV CONTAINER
  const pokemon = document.createElement('div');
  pokemon.className = 'pokemon'
  pokemon.id = pokemonId;

  // Create img element
  const pkImg = document.createElement('img');
  pkImg.src = imgUrl;
  
  // Add Pokemon name underneath image
  const pokeName = document.createElement('h2');
  pokeName.textContent = capitalizeFirstLetter(name);

  // Put div together
  pokemon.appendChild(pkImg);
  pokemon.appendChild(pokeName);

  // Attach onclick event
  pokemon.addEventListener('click', function() {
    displayPokemonInfo(this.id); // What is "this" referring to?????????
  });

  // Append card to parent div
  parent.appendChild(pokemon);
}

/**
 * Takes a Pokemon ID and then fetches corresponding data in the API.
 * @param {number} id The Pokemon's Pokedex ID.
 */
function displayPokemonInfo(id) {
  let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' + id;

  fetch(pokemonUrl)
    .then(x => x.json())
    .then(x => {

      // Display Pokemon info here
      let pokemonInfo = document.createElement('div');
      let pokemonName = document.createElement('h1');
      pokemonName.textContent = x.name;

      pokemonInfo.appendChild(pokemonName);

      // Clear container to PAVE THE WAY FOR INFOOOOOOOOOOOOO
      document.querySelector('.pokemon-container').style.display = 'none';
      document.querySelector('.pokemon-info').textContent = x.name;

    })
    .catch(err => {
      console.log(err);
    })
}

// ----------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}