import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  base: '/nyc_metro_stop_safety_index/',
  plugins: [react(), basicSsl()],
  server: {
    https: true,
    host: true
  }
})
