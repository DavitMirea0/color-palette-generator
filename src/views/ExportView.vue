<template>
  <div class="export-view">
    <h2>Экспорт палитры</h2>
    <p v-if="!currentPalette">Нет активной палитры. Сгенерируйте или загрузите из библиотеки.</p>

    <div v-else>
      <div class="format-selector">
        <label>
          <input type="radio" v-model="format" value="css" />
          CSS Variables
        </label>
        <label>
          <input type="radio" v-model="format" value="scss" />
          SCSS
        </label>
        <label>
          <input type="radio" v-model="format" value="tailwind" />
          Tailwind Config
        </label>
      </div>

      <pre class="code-output">{{ code }}</pre>

      <button @click="copyCode" class="btn primary copy-btn">
        📋 Копировать
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import './ExportView.css'

export default {
  name: 'ExportView',
  setup() {
    const format = ref('css')
    const currentPalette = JSON.parse(localStorage.getItem('palette-current') || 'null')

    const code = computed(() => {
      if (!currentPalette) return ''
      const colors = currentPalette.slice(0, 5)
      const names = ['primary', 'secondary', 'accent', 'neutral', 'highlight']

      switch (format.value) {
        case 'css':
          return `:root {\n` + 
            colors.map((c, i) => `  --color-${names[i]}: ${c.hex};`).join('\n') +
            `\n}`
        case 'scss':
          return colors.map((c, i) => `$${names[i]}: ${c.hex};`).join('\n')
        case 'tailwind':
          const obj = colors.reduce((acc, c, i) => {
            acc[names[i]] = c.hex
            return acc
          }, {})
          return `module.exports = {\n  theme: {\n    extend: {\n      colors: ${JSON.stringify(obj, null, 2).split('\n').map(l => '      ' + l).join('\n').trim()}\n    }\n  }\n}`
        default:
          return ''
      }
    })

    const copyCode = async () => {
      await navigator.clipboard.writeText(code.value)
      alert('✅ Код скопирован!')
    }

    return { format, currentPalette, code, copyCode }
  }
}
</script>