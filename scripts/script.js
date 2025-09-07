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

// Endpoint 4: Obtener todas las áreas válidas de una región
async function getRegionAreas(regionName) {
  try {
    console.log(`🗺️ Buscando áreas válidas en la región: ${regionName}`);
    
    // 1. Obtener datos de la región
    let response = await fetch(`${POKEMON_API_BASE}region/${regionName}`);
    if (!response.ok) throw new Error("No hay net - region");
    let regionData = await response.json();
    
    console.log(`📍 Región encontrada: ${regionData.name}`);
    
    // 2. Extraer todas las locations de la región
    const validLocations = regionData.locations.map(location => {
      // Extraer el nombre de la URL (ej: "/location/1/" → "1")
      const locationId = location.url.split('/').filter(Boolean).pop();
      return {
        name: location.name,
        id: locationId,
        url: location.url
      };
    });
    
    console.log(`🎯 Encontradas ${validLocations.length} locations válidas en ${regionName}:`);
    validLocations.forEach(loc => console.log(`  • ${loc.name}`));
    
    return {
      region: regionName,
      locationCount: validLocations.length,
      validLocations: validLocations
    };
    
  } catch (error) {
    console.error("La cagué obteniendo region", error);
    return null;
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

// Función extra: Buscar Pokemon en múltiples áreas de una región
async function searchPokemonInRegion(regionName, maxAreas = 3) {
  console.log(`🔍 Búsqueda completa de Pokemon en la región: ${regionName}`);
  
  try {
    // 1. Obtener áreas válidas
    const regionData = await getRegionAreas(regionName);
    if (!regionData || !regionData.validLocations.length) {
      console.log("❌ No se encontraron áreas válidas en esta región");
      return;
    }
    
    // 2. Buscar Pokemon en las primeras 'maxAreas' locations
    const results = [];
    for (let i = 0; i < Math.min(maxAreas, regionData.validLocations.length); i++) {
      const location = regionData.validLocations[i];
      console.log(`\n🔍 Analizando: ${location.name}`);
      
      const pokemonResult = await getPokemonTypesInArea(`${location.name}-area`);
      if (pokemonResult && pokemonResult.pokemonCount > 0) {
        results.push(pokemonResult);
      }
    }
    
    // 3. Resumen final
    console.log(`\n📊 RESUMEN DE ${regionName.toUpperCase()}:`);
    console.log(`• Áreas analizadas: ${results.length}`);
    console.log(`• Total Pokemon únicos encontrados: ${results.reduce((sum, r) => sum + r.pokemonCount, 0)}`);
    
    return results;
    
  } catch (error) {
    console.error("Error en búsqueda regional:", error);
  }
}

// Demo: Ejecutar las funciones para mostrar el uso de múltiples endpoints
async function runDemo() {
  console.log("🚀 Iniciando demo con múltiples endpoints de PokeAPI");
  
  try {
    // Ejemplo 1: Buscar áreas válidas en Kanto
    console.log("=".repeat(60));
    const kantoAreas = await getRegionAreas("orange-islands");
    
    if (kantoAreas && kantoAreas.validLocations.length > 0) {
      // Ejemplo 2: Usar una de las áreas válidas encontradas
      console.log("\n" + "=".repeat(60) + "\n");
      const firstLocation = kantoAreas.validLocations[0].name;
      console.log(`🎯 Probando con la primera location válida: ${firstLocation}`);
      
      await getLocation(firstLocation);
      
      // Ejemplo 3: Buscar Pokemon en un área específica
      console.log("\n" + "=".repeat(60) + "\n");
      const result = await getPokemonTypesInArea(`${firstLocation}-area`);
      
      console.log("\n🎉 Resultado final:");
      console.log(result);
    }
    
    console.log("\n" + "=".repeat(60) + "\n");
    
    // Ejemplo 4: Obtener un Pokemon específico
    
    
  } catch (error) {
    console.error("Error en el demo:", error);
  }
}

// Función para probar todas las áreas visibles en el mapa
async function testMapAreas() {
  console.log("🗺️ PROBANDO ÁREAS DEL MAPA POKEMON");
  console.log("=".repeat(60));
  
  // Áreas de la primera imagen (nombres de regiones principales)
  const regionNames = [
    "kanto", "johto", "hoenn", "sinnoh", "unova", "kalos", 
    "alola", "galar", "paldea"
  ];
  
  // Áreas específicas visibles en el mapa (ciudades/towns)
  const specificAreas = [
    // De Kanto
    "pallet-town", "cerulean-city", "lavender-town", "saffron-city",
    "vermilion-city", "celadon-city", "fuchsia-city", "viridian-city",
    
    // De Johto  
    "new-bark-town", "cherrygrove-city", "violet-city", "azalea-town",
    "goldenrod-city", "ecruteak-city", "olivine-city", "cianwood-city",
    
    // De Hoenn
    "littleroot-town", "petalburg-city", "rustboro-city", "dewford-town",
    "slateport-city", "mauville-city", "verdanturf-town", "fallarbor-town",
    
    // De Sinnoh
    "twinleaf-town", "sandgem-town", "jubilife-city", "oreburgh-city",
    "floaroma-town", "eterna-city", "hearthome-city", "solaceon-town",
    "veilstone-city", "pastoria-city", "celestic-town", "canalave-city",
    "snowpoint-city", "sunyshore-city",
    
    // Lugares específicos del mapa que veo
    "tokyo-city", "ryme-city", "fiore", "almia", "oblivia",
    "ferrum", "pasio", "lental"
  ];
  
  console.log("🔍 PROBANDO REGIONES:");
  for (const region of regionNames) {
    try {
      const result = await getRegionAreas(region);
      if (result) {
        console.log(`✅ ${region}: ${result.locationCount} locations encontradas`);
      } else {
        console.log(`❌ ${region}: No válida`);
      }
    } catch (error) {
      console.log(`❌ ${region}: Error - ${error.message}`);
    }
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("🏙️ PROBANDO CIUDADES/ÁREAS ESPECÍFICAS:");
  
  const validAreas = [];
  const invalidAreas = [];
  
  for (const area of specificAreas) {
    try {
      const response = await fetch(`${POKEMON_API_BASE}location/${area}`);
      if (response.ok) {
        validAreas.push(area);
        console.log(`✅ ${area}: Válida`);
      } else {
        invalidAreas.push(area);
        console.log(`❌ ${area}: No válida (${response.status})`);
      }
    } catch (error) {
      invalidAreas.push(area);
      console.log(`❌ ${area}: Error de conexión`);
    }
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("📊 RESUMEN:");
  console.log(`✅ Áreas válidas encontradas: ${validAreas.length}`);
  console.log(`❌ Áreas no válidas: ${invalidAreas.length}`);
  
  console.log("\n🎯 ÁREAS VÁLIDAS PARA USAR:");
  validAreas.forEach(area => console.log(`  • ${area}`));
  
  console.log("\n❌ ÁREAS QUE NO FUNCIONAN:");
  invalidAreas.forEach(area => console.log(`  • ${area}`));
  
  return { validAreas, invalidAreas };
}

// Ejecutar el demo
// runDemo();

// Ejecutar prueba de áreas del mapa
testMapAreas();