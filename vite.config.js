import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // <--- './' rakhne se GitHub Pages subfolder path ki saari problem khatam ho jaati hai
})
