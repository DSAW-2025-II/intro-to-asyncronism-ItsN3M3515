// yo cuando variables de entorno
// Verificar que estamos en el navegador antes de usar window
const POKEMON_API_BASE = (typeof window !== 'undefined' && window.CONFIG?.POKEMON_API_URL) || "https://pokeapi.co/api/v2/"; // el "?" es para que no se dañe si no existe window.CONFIG (fallback)
// esto es para evitar hacerle hardcode a la URL en el código

// Estas regiones como son de spinoffs, me toca hacerle un hardcode a ellas
const SPIN_OFF_REGIONS = {
  orre: {
    name: "orre",
    game: "Pokémon Colosseum/XD: Gale of Darkness",
    generation: "gen-3-spinoff",
    locations: [
      { name: "phenac-city", displayName: "Phenac City", description: "A pristine white city in the desert" },
      { name: "pyrite-town", displayName: "Pyrite Town", description: "A rough mining town" },
      { name: "the-under", displayName: "The Under", description: "Underground city beneath Pyrite Town" },
      { name: "realgam-tower", displayName: "Realgam Tower", description: "A massive tower and colosseum" },
      { name: "agate-village", displayName: "Agate Village", description: "A village built around a large tree" },
      { name: "gateon-port", displayName: "Gateon Port", description: "A bustling harbor town" }
    ],
    pokemon_encounters: [
      { name: "eevee", types: ["normal"] },
      { name: "umbreon", types: ["dark"] },
      { name: "espeon", types: ["psychic"] },
      { name: "makuhita", types: ["fighting"] },
      { name: "slugma", types: ["fire"] }
    ]
  },
  fiore: {
    name: "fiore",
    game: "Pokémon Ranger",
    generation: "gen-3-spinoff",
    locations: [
      { name: "ringtown", displayName: "Ringtown", description: "The main town where Rangers are based" },
      { name: "fall-city", displayName: "Fall City", description: "A city surrounded by autumn forests" },
      { name: "wintown", displayName: "Wintown", description: "A town known for its windmills" },
      { name: "summerland", displayName: "Summerland", description: "A tropical resort area" },
      { name: "lyra-forest", displayName: "Lyra Forest", description: "A mystical forest area" }
    ],
    pokemon_encounters: [
      { name: "plusle", types: ["electric"] },
      { name: "minun", types: ["electric"] },
      { name: "munchlax", types: ["normal"] },
      { name: "deoxys", types: ["psychic"] }
    ]
  },
  almia: {
    name: "almia",
    game: "Pokémon Ranger: Shadows of Almia",
    generation: "gen-4-spinoff",
    locations: [
      { name: "vientown", displayName: "Vientown", description: "A peaceful coastal town" },
      { name: "pueltown", displayName: "Pueltown", description: "A town famous for its school" },
      { name: "boyleland", displayName: "Boyleland", description: "An island resort destination" },
      { name: "haruba-village", displayName: "Haruba Village", description: "A desert village" },
      { name: "chicole-village", displayName: "Chicole Village", description: "A mountain village" }
    ],
    pokemon_encounters: [
      { name: "darkrai", types: ["dark"] },
      { name: "riolu", types: ["fighting"] },
      { name: "rotom", types: ["electric", "ghost"] },
      { name: "shaymin", types: ["grass"] }
    ]
  },
  oblivia: {
    name: "oblivia",
    game: "Pokémon Ranger: Guardian Signs",
    generation: "gen-4-spinoff",
    locations: [
      { name: "cocona-village", displayName: "Cocona Village", description: "The main village on Cocona Island" },
      { name: "renbow-island", displayName: "Renbow Island", description: "A rainbow-colored island" },
      { name: "mitonga-island", displayName: "Mitonga Island", description: "An island with ancient ruins" },
      { name: "faldera-island", displayName: "Faldera Island", description: "A volcanic island" },
      { name: "sophian-island", displayName: "Sophian Island", description: "A mysterious island" }
    ],
    pokemon_encounters: [
      { name: "raikou", types: ["electric"] },
      { name: "entei", types: ["fire"] },
      { name: "suicune", types: ["water"] },
      { name: "latias", types: ["dragon", "psychic"] },
      { name: "latios", types: ["dragon", "psychic"] }
    ]
  },
  ferrum: {
    name: "ferrum",
    game: "Pokkén Tournament",
    generation: "gen-6-spinoff",
    locations: [
      { name: "ferrum-stadium", displayName: "Ferrum Stadium", description: "The main tournament arena" },
      { name: "blue-dome", displayName: "Blue Dome", description: "A high-tech battle facility" },
      { name: "tellur-town", displayName: "Tellur Town", description: "A bustling tournament town" },
      { name: "neos-city", displayName: "Neos City", description: "A futuristic city arena" },
      { name: "dragon-shrine", displayName: "Dragon Shrine", description: "An ancient battle ground" }
    ],
    pokemon_encounters: [
      { name: "pikachu", types: ["electric"] },
      { name: "charizard", types: ["fire", "flying"] },
      { name: "lucario", types: ["fighting", "steel"] },
      { name: "gardevoir", types: ["psychic", "fairy"] },
      { name: "mewtwo", types: ["psychic"] }
    ]
  }
};

// Endpoint 1: Obtener información de una ubicación
async function getLocation(locationName) {
  try {
    let response = await fetch(`${POKEMON_API_BASE}location/${locationName}`);
    if (!response.ok) throw new Error("No hay net - location");
    let data = await response.json();
    console.log(`Ubicación: ${data.name}`, data);
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
    console.log(`Área: ${data.name}`, data);
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
    console.log(`Pokemon: ${data.name}`, data);
    return data;
  } catch (error) {
    console.error("La cagué obteniendo pokemon", error);
  }
}

// Endpoint 4: Obtener todas las áreas válidas de una región
async function getRegionAreas(regionName) {
  try {
    console.log(`Buscando región: ${regionName}`);
    
    // Check if it's a spin-off region first
    if (SPIN_OFF_REGIONS[regionName.toLowerCase()]) {
      return getSpinOffRegionAreas(regionName);
    }
    
    // 1. Obtener datos de la región (from Pokemon API)
    let response = await fetch(`${POKEMON_API_BASE}region/${regionName}`);
    if (!response.ok) throw new Error("No hay net - region");
    let regionData = await response.json();

    console.log(`Región: ${regionData.name}`);

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

    console.log(`Se encontraron ${validLocations.length} lugares en la región ${regionName}:`);
    validLocations.forEach(loc => console.log(`  • ${loc.name}`));
    
    return {
      region: regionName,
      locationCount: validLocations.length,
      validLocations: validLocations,
      isSpinOff: false
    };
    
  } catch (error) {
    console.error("La cagué obteniendo region", error);
    return null;
  }
}

// Custom Endpoint: Obtener áreas de regiones spin-off
function getSpinOffRegionAreas(regionName) {
  const regionKey = regionName.toLowerCase();
  const regionData = SPIN_OFF_REGIONS[regionKey];
  
  if (!regionData) {
    console.log(`Región spinoff no encontrada: ${regionName}`);
    return null;
  }

  console.log(`Región spinoff encontrada ${regionData.name} (${regionData.game})`);

  const validLocations = regionData.locations.map((location, index) => ({
    name: location.name,
    displayName: location.displayName,
    description: location.description,
    id: `spinoff-${regionKey}-${index}`,
    url: `custom://spinoff/${regionKey}/${location.name}`
  }));

  console.log(`Se encontraron ${validLocations.length} lugares válidos en ${regionName}:`);
  validLocations.forEach(loc => console.log(`  • ${loc.displayName} - ${loc.description}`));
  
  return {
    region: regionName,
    game: regionData.game,
    generation: regionData.generation,
    locationCount: validLocations.length,
    validLocations: validLocations,
    isSpinOff: true,
    pokemonEncounters: regionData.pokemon_encounters
  };
}

// Custom Endpoint: Obtener información de ubicación spin-off
function getSpinOffLocation(regionName, locationName) {
  const regionKey = regionName.toLowerCase();
  const regionData = SPIN_OFF_REGIONS[regionKey];
  
  if (!regionData) {
    console.log(`Región spin-off no encontrada: ${regionName}`);
    return null;
  }
  
  const location = regionData.locations.find(loc => loc.name === locationName);
  if (!location) {
    console.log(`Ubicación no encontrada: ${locationName} en ${regionName}`);
    return null;
  }
  
  console.log(`Ubicación spin-off: ${location.displayName}`, location);
  
  return {
    name: location.name,
    displayName: location.displayName,
    description: location.description,
    region: regionData.name,
    game: regionData.game,
    pokemon_encounters: regionData.pokemon_encounters,
    isSpinOff: true
  };
}

// Custom Endpoint: Buscar Pokemon en región spin-off
function getPokemonTypesInSpinOffRegion(regionName) {
  const regionKey = regionName.toLowerCase();
  const regionData = SPIN_OFF_REGIONS[regionKey];
  
  if (!regionData) {
    console.log(`Región spin-off no encontrada: ${regionName}`);
    return null;
  }
  
  console.log(`Analizando Pokemon en región spin-off: ${regionData.name}`);
  
  const pokemonTypes = new Set();
  const pokemonList = regionData.pokemon_encounters.map(pokemon => {
    pokemon.types.forEach(type => pokemonTypes.add(type));
    return {
      name: pokemon.name,
      types: pokemon.types
    };
  });
  
  const uniqueTypes = Array.from(pokemonTypes);
  
  console.log(`Tipos únicos encontrados en ${regionData.name}:`, uniqueTypes);
  console.log(`Pokemon disponibles:`, pokemonList);
  
  return {
    region: regionName,
    game: regionData.game,
    uniqueTypes: uniqueTypes,
    pokemonCount: pokemonList.length,
    pokemonList: pokemonList,
    isSpinOff: true
  };
}

// Universal Endpoint: Obtener información de cualquier región (API o spin-off)
async function getUniversalRegionInfo(regionName) {
  const regionKey = regionName.toLowerCase();
  
  // ¨Ver si la region buscada es spin-off
  if (SPIN_OFF_REGIONS[regionKey]) {
    console.log(`Detectada región spin-off: ${regionName}`);
    return {
      areas: getSpinOffRegionAreas(regionName),
      pokemon: getPokemonTypesInSpinOffRegion(regionName)
    };
  } else {
    console.log(`Detectada región oficial: ${regionName}`);
    try {
      const areas = await getRegionAreas(regionName);
      if (areas && areas.validLocations.length > 0) {
        // Get pokemon from first location as example
        const firstLocation = areas.validLocations[0].name;
        const pokemon = await getPokemonTypesInArea(`${firstLocation}-area`);
        return { areas, pokemon };
      }
    } catch (error) {
      console.error(`Región no encontrada ${regionName}:`, error);
    }
  }
  
  return null;
}

async function getRegionAreas(regionName) {
  try {
    console.log(`Buscando áreas válidas en la región: ${regionName}`);
    
    // 1. Obtener datos de la región
    let response = await fetch(`${POKEMON_API_BASE}region/${regionName}`);
    if (!response.ok) throw new Error("No hay net - region");
    let regionData = await response.json();
    
    console.log(`Región encontrada: ${regionData.name}`);
    
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

    console.log(`Se encontraron ${validLocations.length} lugares válidos en ${regionName}:`);
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
    console.log(`Buscando tipos de Pokemon en el área: ${areaName}`);
    
    // 1. Obtener datos del área
    const areaData = await getLocationArea(areaName);
    if (!areaData || !areaData.pokemon_encounters) {
      console.log("No se encontraron Pokemon en esta área");
      return [];
    }

    console.log(`Encontrados ${areaData.pokemon_encounters.length} Pokemon en el área`);

    // 2. Obtener detalles de cada Pokemon para extraer sus tipos
    const pokemonTypes = new Set(); // Usar Set para evitar duplicados
    const pokemonList = [];

    for (let encounter of areaData.pokemon_encounters.slice(0, 10)) { // Límite de 10 para evitar romper la pagina
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
    
    console.log(`Tipos únicos encontrados en ${areaName}:`, uniqueTypes);
    console.log(`Pokemon analizados:`, pokemonList);

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
  console.log(`Búsqueda completa de Pokemon en la región: ${regionName}`);
  
  try {
    // 1. Obtener áreas válidas
    const regionData = await getRegionAreas(regionName);
    if (!regionData || !regionData.validLocations.length) {
      console.log("No se encontraron áreas válidas en esta región");
      return;
    }
    
    // 2. Buscar Pokemon en las primeras 'maxAreas' locations
    const results = [];
    for (let i = 0; i < Math.min(maxAreas, regionData.validLocations.length); i++) {
      const location = regionData.validLocations[i];
      console.log(`\nAnalizando: ${location.name}`);
      
      const pokemonResult = await getPokemonTypesInArea(`${location.name}-area`);
      if (pokemonResult && pokemonResult.pokemonCount > 0) {
        results.push(pokemonResult);
      }
    }
    
    // 3. Resumen final
    console.log(`\nRESUMEN DE ${regionName.toUpperCase()}:`);
    console.log(`• Áreas analizadas: ${results.length}`);
    console.log(`• Total Pokemon únicos encontrados: ${results.reduce((sum, r) => sum + r.pokemonCount, 0)}`);
    
    return results;
    
  } catch (error) {
    console.error("Error en búsqueda regional:", error);
  }
}

// Demo: Ejecutar las funciones para mostrar el uso de múltiples endpoints
async function runDemo() {
  console.log("Iniciando demo con múltiples endpoints (API + Spin-offs)");
  
  try {
    console.log("=".repeat(60));
    console.log("TESTING OFFICIAL REGION (Pokemon API)");
    console.log("=".repeat(60));
    
    // Ejemplo 1: Región oficial (Sinnoh)
    const sinnohData = await getUniversalRegionInfo("sinnoh");
    console.log("Resultado Sinnoh:", sinnohData);
    
    console.log("\n" + "=".repeat(60));
    console.log("TESTING SPIN-OFF REGION (Custom Data)");
    console.log("=".repeat(60));
    
    // Ejemplo 2: Región spin-off (Orre)
    const orreData = await getUniversalRegionInfo("orre");
    console.log("Resultado Orre:", orreData);
    
    console.log("\n" + "=".repeat(60));
    console.log("TESTING ALL REGIONS FROM YOUR MAP");
    console.log("=".repeat(60));
    
    // Ejemplo 3: Probar todas las regiones de tu mapa
    const allRegions = [
      "kanto", "johto", "hoenn", "sinnoh", "unova", 
      "kalos", "alola", "galar", "hisui", "paldea",
      "orre", "fiore", "almia", "oblivia", "ferrum"
    ];
    
    console.log("Regiones disponibles en tu mapa:");
    for (const region of allRegions) {
      const info = await getUniversalRegionInfo(region);
      if (info) {
        const type = info.areas?.isSpinOff ? "Spin-off" : "Official";
        const locationCount = info.areas?.locationCount || 0;
        console.log(`${region.toUpperCase()} ${type} - ${locationCount} locations`);
      } else {
        console.log(`${region.toUpperCase()} - No disponible`);
      }
    }
    
    console.log("\n" + "=".repeat(60));
    console.log("=".repeat(60));
    
  } catch (error) {
    console.error("Error en el demo:", error);
  }
} 

// Ejecutar el demo
runDemo();

