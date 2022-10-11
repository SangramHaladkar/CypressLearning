import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '838b9j',

  viewportHeight: 1000,
  viewportWidth: 1920,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "http://localhost:4200/",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: [
      '**/1-getting-started/*',
      '**/2-advanced-examples/*'
    ],    
  }
});
