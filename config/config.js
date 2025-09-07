// Configuración de variables de entorno para producción
const config = {
  POKEMON_API_URL: "https://pokeapi.co/api/v2/",
  ENVIRONMENT: "production",
  APP_NAME: "Mi Pokedex"
};

// Exportar la configuración solo si estamos en el navegador
if (typeof window !== 'undefined') {
  window.CONFIG = config;
} else {
  // Si estamos en Node.js, exportar como módulo
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
  }
}
