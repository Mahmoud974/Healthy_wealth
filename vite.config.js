import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression"; // Importez le plugin de compression

export default defineConfig({
  plugins: [
    react(),
    compression(), // Ajoutez le plugin de compression
  ],
});
