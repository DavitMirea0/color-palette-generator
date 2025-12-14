<template>
  <div class="home-view">
    <h1>🎨 Генератор цветовый палитр </h1>
    <p>Инструмент для дизайнеров и разработчиков</p>
    <div class="features">
      <div class="feature-card">
        <h3>🎲 Генерация</h3>
        <p>Случайные и гармоничные палитры (аналогичные, комплементарные, триада)</p>
      </div>
      <div class="feature-card">
        <h3>✅ Доступность</h3>
        <p>Проверка контрастности по WCAG 2.1 (AA, AAA)</p>
      </div>
      <div class="feature-card">
        <h3>💾 Сохранение</h3>
        <p>Библиотека палитр с тегами и поиском</p>
      </div>
      <div class="feature-card">
        <h3>📤 Экспорт</h3>
        <p>CSS, SCSS, Tailwind, копирование HEX/RGB</p>
      </div>
    </div>
    <div class="cta">
      <router-link to="/generator" class="btn primary">Начать генерацию</router-link>
    </div>
  </div>
</template>

<script>
import './HomeView.css'
export default { name: 'HomeView' }
</script>