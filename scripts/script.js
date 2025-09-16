// yo cuando variables de entorno
// Verificar que estamos en el navegador antes de usar window
console.log("🔥 Script.js loading started...");

// DEFINICIONES GLOBALES INMEDIATAS - Disponibles inmediatamente para onclick
window.testClick = function(regionName) {
  console.log(`🧪 IMMEDIATE Test click working for: ${regionName}`);
  alert(`✅ SUCCESS! Click test works for: ${regionName.toUpperCase()}`);
};

// Función de prueba simple para hacer clic en regiones
window.testRegionClick = function(regionName) {
  console.log(`🎯 TEST REGION CLICK: ${regionName}`);
  alert(`🎯 TEST: Region ${regionName.toUpperCase()} clicked successfully!`);
  
  // Mostrar carga
  const loadingEl = document.getElementById('loading');
  if (loadingEl) {
    loadingEl.classList.remove('hidden');
    loadingEl.innerHTML = '<p>🔄 Test loading for ' + regionName + '...</p>';
    console.log('✅ Loading shown for', regionName);
  } else {
    console.log('❌ Loading element not found');
  }
};

window.selectRegion = async function(regionName) {
  try {
    console.log(`🗺️ IMMEDIATE Region click for: ${regionName}`);
    console.log('🔄 Step 1: Function started successfully');
    
    // Primero, verificar si existe la función selectRegion local
    console.log('� Step 2: About to check function availability...');
    console.log('�🔍 Function availability check:');
    console.log('- typeof selectRegion:', typeof selectRegion);
    
    console.log('🔄 Step 3: Function type checked, getting reference...');
    console.log('- selectRegion function:', selectRegion);
    
    console.log('🔄 Step 4: About to check DOM elements...');
    // Verificar si existen los elementos DOM
    const loadingEl = document.getElementById('loading');
    const regionTitleEl = document.getElementById('region-title');
    console.log('🔍 DOM elements check:');
    console.log('- loading element:', loadingEl);
    console.log('- region-title element:', regionTitleEl);
    
    console.log('🔄 Step 5: Validation checks...');
    if (typeof selectRegion !== 'function') {
      console.error('❌ selectRegion function not found!');
      alert(`Function not found for region: ${regionName}`);
      return;
    }
    
    if (!loadingEl || !regionTitleEl) {
      console.error('❌ Required DOM elements not found!');
      alert(`DOM elements missing for region: ${regionName}`);
      return;
    }
    
    // Si llegamos aquí, intentar llamar a la función
    console.log('🚀 About to call selectRegion function...');
    await selectRegion(regionName);
    console.log('✅ selectRegion completed successfully');
    
  } catch (error) {
    console.error('💥 CRITICAL ERROR in window.selectRegion:', error);
    console.error('💥 Error stack:', error.stack);
    alert(`CRITICAL ERROR: ${error.message}`);
  }
};

window.goBack = function() {
  alert("⬅️ Going back...");
};

window.goHome = function() {
  alert("🏠 Going home...");
};

const POKEMON_API_BASE = (typeof window !== 'undefined' && window.CONFIG?.POKEMON_API_URL) || "https://pokeapi.co/api/v2/"; // el "?" es para que no se rompa si no existe window.CONFIG (respaldo)
// esto es para evitar hacerle hardcode a la URL en el código

console.log("🔧 Pokemon API Base URL:", POKEMON_API_BASE);

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
    
    // Verificar si es una región spin-off primero
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
        // Obtener pokemon de la primera ubicación como ejemplo
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

// =============================================================================
// FUNCIONES GLOBALES - Deben definirse en el nivel superior para acceso HTML onclick
// =============================================================================

// Función de prueba para verificar que los clics funcionan
function testClick(regionName) {
  console.log(`🧪 Test click working for: ${regionName}`);
  alert(`Click test successful! Region: ${regionName}`);
}

// Estado global para rastrear la navegación actual
let currentState = {
  view: 'home', // 'home', 'region', 'location'
  currentRegion: null,
  currentLocation: null,
  regionData: null
};

// Funciones de utilidad para mostrar/ocultar elementos
function showElement(id) {
  const element = document.getElementById(id);
  if (element) element.classList.remove('hidden');
}

function hideElement(id) {
  const element = document.getElementById(id);
  if (element) element.classList.add('hidden');
}

function showLoading() {
  hideAllSections();
  showElement('loading');
}

function hideLoading() {
  hideElement('loading');
}

function showError(message) {
  hideLoading();
  document.getElementById('error-text').textContent = message;
  showElement('error-message');
}

function hideAllSections() {
  hideElement('region-info');
  hideElement('locations-container');
  hideElement('pokemon-container');
  hideElement('error-message');
  hideElement('loading');
  hideElement('navigation');
}

// Main function called when user clicks a region on the map
async function selectRegion(regionName) {
  console.log(`🗺️ Usuario seleccionó región: ${regionName}`);
  console.log(`🔍 Iniciando búsqueda de información para: ${regionName}`);
  
  // Add visual feedback immediately
  alert(`Cargando información de la región: ${regionName.toUpperCase()}`);
  
  showLoading();
  
  try {
    // Get region data using existing function
    console.log(`📡 Llamando getUniversalRegionInfo para: ${regionName}`);
    const regionData = await getUniversalRegionInfo(regionName);
    console.log(`📊 Datos recibidos para ${regionName}:`, regionData);
    
    if (!regionData || !regionData.areas) {
      console.error(`❌ No se obtuvieron datos válidos para: ${regionName}`);
      showError(`No se pudo obtener información de la región: ${regionName}`);
      return;
    }
    
    // Update global state
    currentState = {
      view: 'region',
      currentRegion: regionName,
      currentLocation: null,
      regionData: regionData
    };
    
    console.log(`✅ Mostrando información de región: ${regionName}`);
    // Display region information
    displayRegionInfo(regionName, regionData);
    
  } catch (error) {
    console.error("❌ Error seleccionando región:", error);
    showError(`Error cargando región ${regionName}: ${error.message}`);
  }
}

// Navigation functions
function goBack() {
  if (currentState.view === 'location') {
    // Go back to region view
    displayRegionInfo(currentState.currentRegion, currentState.regionData);
  } else if (currentState.view === 'region') {
    // Go back to home
    goHome();
  }
}

function goHome() {
  currentState = {
    view: 'home',
    currentRegion: null,
    currentLocation: null,
    regionData: null
  };
  
  hideAllSections();
}

// Make functions globally accessible for HTML onclick events
window.testClick = testClick;
window.selectRegion = selectRegion;
window.testRegionClick = function(regionName) {
  console.log(`🎯 TEST REGION CLICK: ${regionName}`);
  
  // First show alert to confirm function works
  alert(`🎯 TEST: Region ${regionName.toUpperCase()} clicked successfully! Check console for element details.`);
  
  // Debug all elements
  console.log('🔍 DEBUGGING ALL ELEMENTS:');
  const loadingEl = document.getElementById('loading');
  const regionTitle = document.getElementById('region-title');  
  const contentArea = document.getElementById('content-area');
  
  console.log('- loading element:', loadingEl);
  console.log('- region-title element:', regionTitle);
  console.log('- content-area element:', contentArea);
  
  if (loadingEl) {
    console.log('BEFORE - loading classList:', loadingEl.classList.toString());
    console.log('BEFORE - loading display:', getComputedStyle(loadingEl).display);
    console.log('BEFORE - loading visibility:', getComputedStyle(loadingEl).visibility);
    
    // Force show loading element
    loadingEl.classList.remove('hidden');
    loadingEl.style.display = 'block';
    loadingEl.style.visibility = 'visible';
    loadingEl.style.backgroundColor = 'yellow'; // Make it super obvious
    loadingEl.style.padding = '20px';
    loadingEl.style.border = '3px solid red';
    loadingEl.innerHTML = '<h2>🔄 TEST LOADING FOR ' + regionName.toUpperCase() + '</h2>';
    
    console.log('AFTER - loading classList:', loadingEl.classList.toString());
    console.log('AFTER - loading display:', getComputedStyle(loadingEl).display);
    console.log('AFTER - loading visibility:', getComputedStyle(loadingEl).visibility);
    console.log('✅ Loading element modified');
  }
  
  // Try to show region title too
  if (regionTitle) {
    regionTitle.style.display = 'block';
    regionTitle.style.backgroundColor = 'lightblue';
    regionTitle.style.padding = '10px';
    regionTitle.textContent = `🌍 TESTING: ${regionName.toUpperCase()}`;
    console.log('✅ Region title updated');
  }
};
window.goBack = goBack;
window.goHome = goHome;
window.getUniversalRegionInfo = getUniversalRegionInfo;

console.log("🌐 Global functions exposed:", {
  testClick: typeof window.testClick,
  selectRegion: typeof window.selectRegion,
  testRegionClick: typeof window.testRegionClick,
  goBack: typeof window.goBack,
  goHome: typeof window.goHome,
  getUniversalRegionInfo: typeof window.getUniversalRegionInfo
});

// Display region information and location buttons
function displayRegionInfo(regionName, regionData) {
  hideLoading();
  hideAllSections();
  
  const areas = regionData.areas;
  
  // Update region info section
  document.getElementById('region-title').textContent = 
    `🌍 Región: ${regionName.charAt(0).toUpperCase() + regionName.slice(1)}`;
  
  let description = `Tipo: ${areas.isSpinOff ? 'Spin-off' : 'Región oficial'}`;
  if (areas.game) description += `\nJuego: ${areas.game}`;
  if (areas.generation) description += `\nGeneración: ${areas.generation}`;
  
  document.getElementById('region-description').textContent = description;
  document.getElementById('region-stats').innerHTML = 
    `<p>📍 <strong>${areas.locationCount}</strong> ubicaciones disponibles</p>`;
  
  // Create location buttons
  const locationsGrid = document.getElementById('locations-grid');
  locationsGrid.innerHTML = ''; // Clear previous content
  
  areas.validLocations.forEach(location => {
    const button = document.createElement('button');
    button.className = 'location-button';
    button.textContent = location.displayName || location.name;
    button.onclick = () => selectLocation(location, areas.isSpinOff);
    
    if (location.description) {
      button.title = location.description;
    }
    
    locationsGrid.appendChild(button);
  });
  
  // Show sections
  showElement('region-info');
  showElement('locations-container');
  showElement('navigation');
}

// Function called when user clicks a location button
async function selectLocation(location, isSpinOff) {
  console.log(`📍 Usuario seleccionó ubicación: ${location.name}`);
  
  showLoading();
  
  try {
    currentState.view = 'location';
    currentState.currentLocation = location;
    
    if (isSpinOff) {
      // Handle spin-off locations
      displaySpinOffLocationPokemon(location);
    } else {
      // Handle official API locations
      await displayOfficialLocationPokemon(location);
    }
    
  } catch (error) {
    console.error("Error seleccionando ubicación:", error);
    showError(`Error cargando ubicación ${location.name}: ${error.message}`);
  }
}

// Display Pokemon for spin-off regions
function displaySpinOffLocationPokemon(location) {
  hideLoading();
  hideAllSections();
  
  const regionData = currentState.regionData;
  const pokemonList = regionData.areas.pokemonEncounters || [];
  
  // Update location title
  document.getElementById('location-title').textContent = 
    `📍 ${location.displayName || location.name}`;
  
  if (pokemonList.length === 0) {
    showElement('no-pokemon-message');
  } else {
    displayPokemonGrid(pokemonList, true); // true = isSpinOff
  }
  
  showElement('pokemon-container');
  showElement('navigation');
}

// Display Pokemon for official API locations
async function displayOfficialLocationPokemon(location) {
  try {
    // Try to get Pokemon from this location area
    const pokemonData = await getPokemonTypesInArea(`${location.name}-area`);
    
    hideLoading();
    hideAllSections();
    
    // Update location title
    document.getElementById('location-title').textContent = 
      `📍 ${location.name.charAt(0).toUpperCase() + location.name.slice(1)}`;
    
    if (!pokemonData || pokemonData.pokemonCount === 0) {
      showElement('no-pokemon-message');
    } else {
      displayPokemonGrid(pokemonData.pokemonList, false); // false = not spin-off
    }
    
    showElement('pokemon-container');
    showElement('navigation');
    
  } catch (error) {
    console.error("Error getting official location Pokemon:", error);
    hideLoading();
    hideAllSections();
    showElement('no-pokemon-message');
    showElement('pokemon-container');
    showElement('navigation');
  }
}

// Display Pokemon in a grid layout with their stats
async function displayPokemonGrid(pokemonList, isSpinOff) {
  const pokemonGrid = document.getElementById('pokemon-grid');
  pokemonGrid.innerHTML = ''; // Clear previous content
  
  for (const pokemon of pokemonList) {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'pokemon-card';
    
    try {
      let pokemonDetails;
      
      if (isSpinOff) {
        // For spin-off regions, we already have basic info
        pokemonDetails = {
          name: pokemon.name,
          types: pokemon.types.map(type => ({ type: { name: type } })),
          weight: null, // Not available for spin-offs
          height: null, // Not available for spin-offs
          sprites: { front_default: null }, // We'll use a placeholder
          stats: [] // Not available for spin-offs
        };
      } else {
        // For official regions, fetch full details
        pokemonDetails = await getPokemonDetails(pokemon.name);
      }
      
      if (pokemonDetails) {
        pokemonCard.innerHTML = createPokemonCardHTML(pokemonDetails, isSpinOff);
      } else {
        pokemonCard.innerHTML = `
          <div class="pokemon-error">
            <h4>❌ ${pokemon.name}</h4>
            <p>Error cargando datos</p>
          </div>
        `;
      }
      
    } catch (error) {
      console.error(`Error loading Pokemon ${pokemon.name}:`, error);
      pokemonCard.innerHTML = `
        <div class="pokemon-error">
          <h4>❌ ${pokemon.name}</h4>
          <p>Error cargando datos</p>
        </div>
      `;
    }
    
    pokemonGrid.appendChild(pokemonCard);
  }
  
  showElement('pokemon-container');
}

// Create HTML for a Pokemon card
function createPokemonCardHTML(pokemon, isSpinOff) {
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const types = pokemon.types.map(t => t.type.name).join(', ');
  
  // Pokemon image
  const imageUrl = pokemon.sprites?.front_default || 
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromName(pokemon.name)}.png`;
  
  // Stats section
  let statsHTML = '';
  if (!isSpinOff && pokemon.stats && pokemon.stats.length > 0) {
    statsHTML = `
      <div class="pokemon-stats">
        <h5>📊 Estadísticas base:</h5>
        <ul>
          ${pokemon.stats.map(stat => 
            `<li><strong>${translateStatName(stat.stat.name)}:</strong> ${stat.base_stat}</li>`
          ).join('')}
        </ul>
      </div>
    `;
  }
  
  // Physical data section
  let physicalHTML = '';
  if (!isSpinOff && pokemon.weight !== null && pokemon.height !== null) {
    physicalHTML = `
      <div class="pokemon-physical">
        <p><strong>⚖️ Peso:</strong> ${pokemon.weight / 10} kg</p>
        <p><strong>📏 Altura:</strong> ${pokemon.height / 10} m</p>
      </div>
    `;
  }
  
  return `
    <div class="pokemon-header">
      <h4>🐾 ${name}</h4>
      <p><strong>Tipo(s):</strong> ${types}</p>
    </div>
    
    <div class="pokemon-image">
      <img src="${imageUrl}" alt="${name}" onerror="this.src='https://via.placeholder.com/96x96?text=Pokemon'">
    </div>
    
    ${physicalHTML}
    ${statsHTML}
    
    ${isSpinOff ? '<p class="spin-off-note">ℹ️ Región spin-off</p>' : ''}
  `;
}

// Helper function to get Pokemon ID from name (for image URL)
function getPokemonIdFromName(name) {
  // This is a simple approximation - in real apps you'd have a proper mapping
  const commonPokemon = {
    'pikachu': 25, 'charizard': 6, 'blastoise': 9, 'venusaur': 3,
    'mewtwo': 150, 'mew': 151, 'eevee': 133, 'umbreon': 197,
    'espeon': 196, 'lucario': 448, 'gardevoir': 282, 'rayquaza': 384
  };
  
  return commonPokemon[name.toLowerCase()] || 1; // Default to Bulbasaur
}

// Helper function to translate stat names to Spanish
function translateStatName(statName) {
  const translations = {
    'hp': 'PS',
    'attack': 'Ataque',
    'defense': 'Defensa',
    'special-attack': 'At. Especial',
    'special-defense': 'Def. Especial',
    'speed': 'Velocidad'
  };
  
  return translations[statName] || statName;
}

// Navigation functions
function goBack() {
  if (currentState.view === 'location') {
    // Go back to region view
    displayRegionInfo(currentState.currentRegion, currentState.regionData);
  } else if (currentState.view === 'region') {
    // Go back to home
    goHome();
  }
}

function goHome() {
  currentState = {
    view: 'home',
    currentRegion: null,
    currentLocation: null,
    regionData: null
  };
  
  hideAllSections();
}

// Initialize the application when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log("🚀 Pokédex app initialized!");
  console.log("Click on any region in the map to start exploring!");
  
  // Verify that elements exist
  console.log("📋 Checking page elements...");
  console.log("Map image:", document.querySelector('img[usemap="#pokemon-map"]'));
  console.log("Map areas:", document.querySelectorAll('area').length);
  
  // Also attach click listeners programmatically as backup
  attachMapClickListeners();
  
  // Don't run the automatic demo anymore since we have interactive UI
  // runDemo();
});

// Backup method: Attach click listeners programmatically
function attachMapClickListeners() {
  console.log("🔗 Attaching click listeners programmatically...");
  
  const areas = document.querySelectorAll('area');
  console.log(`Found ${areas.length} map areas`);
  
  areas.forEach((area, index) => {
    const regionName = area.alt.toLowerCase().replace(' region', '').replace(' (test)', '');
    console.log(`Setting up area ${index}: ${regionName}`);
    
    // Add event listener as backup
    area.addEventListener('click', function(e) {
      e.preventDefault();
      console.log(`🖱️ Programmatic click detected for: ${regionName}`);
      
      if (regionName === 'kalos' && area.title.includes('TEST')) {
        testClick(regionName);
      } else {
        selectRegion(regionName);
      }
    });
    
    // Also make sure the onclick attribute is properly set
    if (regionName === 'kalos' && area.title.includes('TEST')) {
      area.setAttribute('onclick', `testClick('${regionName}')`);
    } else {
      area.setAttribute('onclick', `selectRegion('${regionName}')`);
    }
  });
}

// =============================================================================
// DOM DISPLAY FUNCTIONS
// =============================================================================

