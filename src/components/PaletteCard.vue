<template>
  <div class="palette-card">
    <div class="palette-header">
      <h4>{{ palette.name }}</h4>
      <small>{{ new Date(palette.savedAt).toLocaleString('ru-RU') }}</small>
    </div>
    <div class="colors-preview">
      <div
        v-for="color in palette.colors"
        :key="color.hex"
        class="color-swatch"
        :style="{ backgroundColor: color.hex }"
        :title="color.hex"
      ></div>
    </div>
    <div class="palette-actions">
      <button @click="$emit('apply')" class="btn small apply">Применить</button>
      <button @click="$emit('delete')" class="btn small delete">🗑</button>
    </div>
  </div>
</template>

<script>
import './PaletteCard.css'
export default {
  name: 'PaletteCard',
  props: { palette: Object },
  emits: ['apply', 'delete']
}
</script>