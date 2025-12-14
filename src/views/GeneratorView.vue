<template>
  <div class="generator-view">
    <h2>Генератор палитр</h2>

    <!-- Настройки -->
    <div class="controls">
      <label>
        Количество цветов:
        <select v-model="count">
          <option :value="3">3</option>
          <option :value="5" selected>5</option>
          <option :value="7">7</option>
        </select>
      </label>

      <label>
        Формат:
        <select v-model="format">
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
        </select>
      </label>

      <label>
        Тип палитры:
        <select v-model="type">
          <option value="random">Случайная</option>
          <option value="analogous">Аналогичная</option>
          <option value="complementary">Комплементарная</option>
          <option value="triadic">Триада</option>
        </select>
      </label>

      <ColorPicker v-model="baseColor" label="Базовый цвет" />
    </div>

    <!-- Палитра -->
    <div class="palette">
      <div
        v-for="(color, index) in palette"
        :key="index"
        class="color-card"
        :style="{ backgroundColor: color.hex }"
        @click="copy(color[format])"
        :title="`Кликните, чтобы скопировать ${color[format]}`"
      >
        <span>{{ color[format] }}</span>
        <button @click.stop="togglePin(index)" class="pin-btn">
          {{ color.pinned ? '📌' : '📍' }}
        </button>
      </div>
    </div>

    <!-- Анализ -->
    <ContrastChecker :palette="palette" />

    <!-- Превью -->
    <div class="preview">
      <label>
        <input type="checkbox" v-model="darkMode" />
        Тёмный режим
      </label>
      <div :class="['mockup', { dark: darkMode }]">
        <h2>Заголовок</h2>
        <button class="mock-btn">Кнопка</button>
        <div class="mock-card">
          <h3>Карточка</h3>
          <p>Текст карточки с цветами из палитры</p>
        </div>
      </div>
    </div>

    <button @click="saveToLibrary" class="btn primary save-btn">
      💾 Сохранить в библиотеку
    </button>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import ColorPicker from '../components/ColorPicker.vue'
import ContrastChecker from '../components/ContrastChecker.vue'
import { 
  randomPalette, 
  analogousPalette, 
  complementaryPalette, 
  triadicPalette,
  hexToRgb 
} from '../utils/colorUtils'

import './GeneratorView.css'

export default {
  name: 'GeneratorView',
  components: { ColorPicker, ContrastChecker },
  setup() {
    const count = ref(5)
    const format = ref('hex')
    const type = ref('random')
    const baseColor = ref('#667eea')
    const darkMode = ref(false)

    const palette = ref([])

    // Генерация в зависимости от типа
    const generate = () => {
      let colors = []
      switch (type.value) {
        case 'analogous':
          colors = analogousPalette(baseColor.value, count.value)
          break
        case 'complementary':
          colors = complementaryPalette(baseColor.value, count.value)
          break
        case 'triadic':
          colors = triadicPalette(baseColor.value, count.value)
          break
        default:
          colors = randomPalette(count.value)
      }

      palette.value = colors.map(c => ({
        hex: c,
        rgb: hexToRgb(c),
        pinned: false
      }))
      saveToStorage()
    }

    // Закрепление
    const togglePin = (index) => {
      const updated = [...palette.value]
      updated[index] = { ...updated[index], pinned: !updated[index].pinned }
      palette.value = updated
      saveToStorage()
    }

    // Копирование
    const copy = async (text) => {
      await navigator.clipboard.writeText(text)
      alert(`✅ Скопировано: ${text}`)
    }

    // Сохранение в localStorage
    const STORAGE_KEY = 'palette-current'
    const saveToStorage = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(palette.value))
    }
    const loadFromStorage = () => {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) palette.value = JSON.parse(saved)
      else generate()
    }

    // Сохранить в библиотеку
    const saveToLibrary = () => {
      const libKey = 'palette-library'
      const lib = JSON.parse(localStorage.getItem(libKey) || '[]')
      const newEntry = {
        id: Date.now(),
        name: `Палитра от ${new Date().toLocaleDateString()}`,
        colors: palette.value,
        type: type.value,
        savedAt: new Date().toISOString()
      }
      lib.unshift(newEntry)
      localStorage.setItem(libKey, JSON.stringify(lib.slice(0, 50)))
      alert('✅ Палитра сохранена в библиотеку!')
    }

    // Реакция на изменения
    watch([count, type, baseColor], generate)

    // Инициализация
    loadFromStorage()

    return {
      count, format, type, baseColor, darkMode,
      palette,
      togglePin, copy, saveToLibrary
    }
  }
}
</script>