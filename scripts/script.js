// yo cuando variables de entorno
const URL = window.CONFIG?.POKEMON_API_URL || "https://pokeapi.co/api/v2/pokemon/";

async function fetchPokemon(pokemon) {
  try {
    let response = await fetch(`${URL}${pokemon}`);
    if (!response.ok) throw new Error("No hay net");
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("La cagué", error);
  }
}

fetchPokemon("pikachu").then(data => {
  console.log(data);
});
