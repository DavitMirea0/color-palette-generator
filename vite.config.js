// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],  // ← Обязательная запятая здесь!

  // Опционально: настройка сервера разработки
  server: {
    port: 5173,
    open: true, // автоматически открывать браузер
    host: 'localhost'
  }
}
)