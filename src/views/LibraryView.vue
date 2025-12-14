<template>
  <div class="library-view">
    <h2>Библиотека палитр</h2>
    <input
      v-model="searchQuery"
      placeholder="Поиск по названию..."
      class="search-input"
    />
    <div v-if="filteredPalettes.length === 0" class="empty">
      Библиотека пуста. Сохраните палитру в разделе «Генератор».
    </div>
    <div class="palettes-grid">
      <PaletteCard
        v-for="p in filteredPalettes"
        :key="p.id"
        :palette="p"
        @apply="applyPalette(p)"
        @delete="deletePalette(p.id)"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import PaletteCard from '../components/PaletteCard.vue'
import './LibraryView.css'

export default {
  name: 'LibraryView',
  components: { PaletteCard },
  setup() {
    const searchQuery = ref('')
    const LIB_KEY = 'palette-library'
    const library = ref(JSON.parse(localStorage.getItem(LIB_KEY) || '[]'))

    const filteredPalettes = computed(() => {
      return library.value.filter(p =>
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const deletePalette = (id) => {
      library.value = library.value.filter(p => p.id !== id)
      localStorage.setItem(LIB_KEY, JSON.stringify(library.value))
    }

    const applyPalette = (p) => {
      localStorage.setItem('palette-current', JSON.stringify(p.colors))
      alert(`✅ Палитра "${p.name}" загружена! Перейдите в «Генератор».`)
    }

    return { searchQuery, filteredPalettes, deletePalette, applyPalette }
  }
}
</script>