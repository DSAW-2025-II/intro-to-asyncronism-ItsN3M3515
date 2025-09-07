// yo cuando variables de entorno
// Verificar que estamos en el navegador antes de usar window
const POKEMON_API_BASE = (typeof window !== 'undefined' && window.CONFIG?.POKEMON_API_URL) || "https://pokeapi.co/api/v2/"; // el "?" es para que no se dañe si no existe window.CONFIG (fallback)
// esto es para evitar hacerle hardcode a la URL en el código

// Endpoint 1: Obtener información de una ubicación
async function getLocation(locationName) {
  try {
    let response = await fetch(`${POKEMON_API_BASE}location/${locationName}`);
    if (!response.ok) throw new Error("No hay net - location");
    let data = await response.json();
    console.log(`📍 Ubicación: ${data.name}`, data);
    return data;
  } catch (error) {
    console.error("La cagué obteniendo location", error);
  }
}

// Endpoint 2: Obtener información de un área específica de ubicación
async function getLocationArea(areaName) {
  try {
    let response = await fetch(`${POKEMON_API_BASE}location-area/${areaName}`);
    if (!response.ok) throw new Error("No hay net - location area");
    let data = await response.json();
    console.log(`🏞️ Área: ${data.name}`, data);
    return data;
  } catch (error) {
    console.error("La cagué obteniendo location area", error);
  }
}

// Endpoint 3: Obtener detalles de un Pokemon específico
async function getPokemonDetails(pokemonNameOrUrl) {
  try {
    // Si recibimos una URL completa, úsala; si no, construye la URL
    const url = pokemonNameOrUrl.startsWith('http') 
      ? pokemonNameOrUrl 
      : `${POKEMON_API_BASE}pokemon/${pokemonNameOrUrl}`;
    
    let response = await fetch(url);
    if (!response.ok) throw new Error("No hay net - pokemon");
    let data = await response.json();
    console.log(`🐾 Pokemon: ${data.name}`, data);
    return data;
  } catch (error) {
    console.error("La cagué obteniendo pokemon", error);
  }
}

// Función principal: Obtener tipos de Pokemon en un área específica
async function getPokemonTypesInArea(areaName) {
  try {
    console.log(`🔍 Buscando tipos de Pokemon en el área: ${areaName}`);
    
    // 1. Obtener datos del área
    const areaData = await getLocationArea(areaName);
    if (!areaData || !areaData.pokemon_encounters) {
      console.log("❌ No se encontraron Pokemon en esta área");
      return [];
    }

    console.log(`📊 Encontrados ${areaData.pokemon_encounters.length} Pokemon en el área`);

    // 2. Obtener detalles de cada Pokemon para extraer sus tipos
    const pokemonTypes = new Set(); // Usar Set para evitar duplicados
    const pokemonList = [];

    for (let encounter of areaData.pokemon_encounters.slice(0, 10)) { // Límite de 10 para evitar muchas llamadas
      const pokemonData = await getPokemonDetails(encounter.pokemon.url);
      
      if (pokemonData && pokemonData.types) {
        // Guardar info del Pokemon
        pokemonList.push({
          name: pokemonData.name,
          types: pokemonData.types.map(t => t.type.name)
        });

        // Agregar tipos al Set
        pokemonData.types.forEach(typeInfo => {
          pokemonTypes.add(typeInfo.type.name);
        });
      }
    }

    const uniqueTypes = Array.from(pokemonTypes);
    
    console.log(`🎯 Tipos únicos encontrados en ${areaName}:`, uniqueTypes);
    console.log(`📋 Pokemon analizados:`, pokemonList);

    return {
      area: areaName,
      uniqueTypes: uniqueTypes,
      pokemonCount: pokemonList.length,
      pokemonList: pokemonList
    };

  } catch (error) {
    console.error("La cagué en la función principal", error);
  }
}

// Demo: Ejecutar las funciones para mostrar el uso de múltiples endpoints
async function runDemo() {
  console.log("🚀 Iniciando demo con múltiples endpoints de PokeAPI");
  
  try {
    // Ejemplo 1: Obtener ubicación
    await getLocation("canalave-city");
    
    console.log("\n" + "=".repeat(50) + "\n");
    
    // Ejemplo 2: Análisis completo de un área
    const result = await getPokemonTypesInArea("canalave-city-area");
    
    console.log("\n🎉 Resultado final:");
    console.log(result);
    
    console.log("\n" + "=".repeat(50) + "\n");
    
    // Ejemplo 3: Obtener un Pokemon específico
    await getPokemonDetails("pikachu");
    
  } catch (error) {
    console.error("Error en el demo:", error);
  }
}

// Ejecutar el demo
runDemo();