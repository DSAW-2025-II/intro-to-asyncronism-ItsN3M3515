// Get ALL regions available in PokeAPI
const POKEMON_API_BASE = "https://pokeapi.co/api/v2/";

async function getAllRegions() {
  console.log("🗺️ GETTING ALL AVAILABLE REGIONS FROM POKEAPI");
  console.log("=".repeat(60));
  
  try {
    // Get all regions
    const response = await fetch(`${POKEMON_API_BASE}region/`);
    const data = await response.json();
    
    console.log(`📊 Total regions found: ${data.count}`);
    console.log("\n🎯 ALL AVAILABLE REGIONS:");
    
    const regionDetails = [];
    
    // Get details for each region
    for (let i = 0; i < data.results.length; i++) {
      const region = data.results[i];
      console.log(`\n${i + 1}. 📍 ${region.name.toUpperCase()}`);
      
      try {
        // Get region details
        const regionResponse = await fetch(region.url);
        const regionData = await regionResponse.json();
        
        console.log(`   • Generation: ${regionData.main_generation?.name || 'N/A'}`);
        console.log(`   • Locations: ${regionData.locations.length}`);
        console.log(`   • Pokedexes: ${regionData.pokedexes.length}`);
        
        // Show some example locations
        if (regionData.locations.length > 0) {
          console.log(`   • Example locations:`);
          const exampleLocations = regionData.locations.slice(0, 5);
          exampleLocations.forEach(loc => {
            console.log(`     - ${loc.name}`);
          });
          if (regionData.locations.length > 5) {
            console.log(`     ... and ${regionData.locations.length - 5} more`);
          }
        }
        
        regionDetails.push({
          name: region.name,
          generation: regionData.main_generation?.name,
          locationCount: regionData.locations.length,
          locations: regionData.locations.map(loc => loc.name)
        });
        
      } catch (error) {
        console.log(`   ❌ Error getting details: ${error.message}`);
      }
    }
    
    console.log("\n" + "=".repeat(60));
    console.log("📋 SUMMARY OF ALL REGIONS:");
    regionDetails.forEach((region, index) => {
      console.log(`${index + 1}. ${region.name} (Gen: ${region.generation}) - ${region.locationCount} locations`);
    });
    
    console.log("\n🎮 RECOMMENDATIONS FOR YOUR PROJECT:");
    const topRegions = regionDetails
      .filter(r => r.locationCount > 10)
      .sort((a, b) => b.locationCount - a.locationCount)
      .slice(0, 5);
    
    console.log("Top regions with most locations:");
    topRegions.forEach((region, index) => {
      console.log(`${index + 1}. ${region.name} - ${region.locationCount} locations`);
    });
    
    return regionDetails;
    
  } catch (error) {
    console.error("❌ Error getting regions:", error);
  }
}

// Also get all location-areas to see what's really searchable
async function getAllLocationAreas() {
  console.log("\n\n🏞️ GETTING ALL LOCATION-AREAS (SEARCHABLE AREAS)");
  console.log("=".repeat(60));
  
  try {
    const response = await fetch(`${POKEMON_API_BASE}location-area/?limit=50`);
    const data = await response.json();
    
    console.log(`📊 Total location-areas: ${data.count}`);
    console.log("🎯 First 50 searchable areas:");
    
    data.results.forEach((area, index) => {
      console.log(`${index + 1}. ${area.name}`);
    });
    
    console.log(`\n... and ${data.count - 50} more areas available`);
    
  } catch (error) {
    console.error("❌ Error getting location-areas:", error);
  }
}

async function runCompleteAnalysis() {
  await getAllRegions();
  await getAllLocationAreas();
}

runCompleteAnalysis();
