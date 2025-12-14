<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/generator" class="nav-link">Генератор</router-link>
      <router-link to="/library" class="nav-link">Библиотека</router-link>
      <router-link to="/export" class="nav-link">Экспорт</router-link>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="app-footer">
      <p>Vue 3 • КР №5 • Генератор цветовых палитр</p>
    </footer>
  </div>
</template>

<script>
import './App.css'
export default { name: 'App' }
</script>