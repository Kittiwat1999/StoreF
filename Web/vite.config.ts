import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
      interval: 100, // ms — adjust as needed (to avoid excessive CPU usage)
    },
    host: true, // listen on all interfaces, not just localhost
    hmr: {
      clientPort: 5173, // port seen by the browser (matching the mapping in docker-compose)
    },
  },
});
