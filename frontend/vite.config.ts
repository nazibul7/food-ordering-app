import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteCompression from "vite-plugin-compression"

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: "gzip" })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
