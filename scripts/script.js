// yo cuando variables de entorno
// Verificar que estamos en el navegador antes de usar window
const URL = (typeof window !== 'undefined' && window.CONFIG?.POKEMON_API_URL) || "https://pokeapi.co/api/v2/pokemon/"; // el "?" es para que no se dañe si no existe window.CONFIG (fallback)
// esto es para evitar hacerle hardcode a la URL en el código

async function getLocalPokemon(location){
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/location/${location}`);
    if (!response.ok) throw new Error("No hay net");
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("La cagué", error);
  }
}

getLocalPokemon("canalave-city").then(data => {
  console.log(data);
});