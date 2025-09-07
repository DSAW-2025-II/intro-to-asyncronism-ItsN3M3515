// Quick test of map areas
const POKEMON_API_BASE = "https://pokeapi.co/api/v2/";

async function quickTest() {
  console.log("🔍 QUICK TEST - AREAS FROM YOUR MAPS:");
  
  // Areas from the first image (region names)
  const regions = ["kanto", "johto", "hoenn", "sinnoh"];
  
  // Specific places visible in the maps
  const mapPlaces = [
    "tokyo-city", "ryme-city", "fiore", "almia", "oblivia",
    "ferrum", "pasio", "lental", "galar", "paldea",
    "cerulean-city", "pallet-town", "lavender-town"
  ];
  
  console.log("\n🗺️ TESTING REGIONS:");
  for (const region of regions) {
    try {
      const response = await fetch(`${POKEMON_API_BASE}region/${region}`);
      console.log(`${response.ok ? '✅' : '❌'} ${region}: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${region}: Error`);
    }
  }
  
  console.log("\n🏙️ TESTING SPECIFIC MAP PLACES:");
  for (const place of mapPlaces) {
    try {
      const response = await fetch(`${POKEMON_API_BASE}location/${place}`);
      console.log(`${response.ok ? '✅' : '❌'} ${place}: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${place}: Error`);
    }
  }
}

quickTest();
