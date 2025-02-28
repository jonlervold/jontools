import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use the .env file in the root directory, not in the frontend directory
  envDir: "../",
  server: {
    // Set reverse proxy to forward requests to the Python backend for DEV
    // See nginx.conf for PROD reverse proxy config
    proxy: {
      "/python-api": {
        target: "http://python-backend:8000/", // Reference Docker network name for forwarding.
        changeOrigin: true, // Needed when proxying to a different domain/origin than the frontend
        secure: false, // Local Pythonbackend is HTTP
        // By default the request will forward with "/python-api/" attached,
        //   this rewrite removes the "/python-api/" from the request
        rewrite: (path) => path.replace(/^\/python-api/, ""),
      },
    },
  },
});
