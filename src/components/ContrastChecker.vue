<template>
  <div class="contrast-checker">
    <h3>Проверка контраста (WCAG)</h3>
    <div v-for="(item, i) in pairs" :key="i" class="contrast-item">
      <div class="color-pair">
        <span :style="{ backgroundColor: item.bg }" class="sample"></span>
        <span :style="{ backgroundColor: item.fg }" class="sample fg"></span>
        <span>{{ item.ratio.toFixed(2) }}:1</span>
      </div>
      <span :class="['level-badge', item.level.toLowerCase()]">
        {{ item.level }}
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { getContrast } from '../utils/colorUtils'
import './ContrastChecker.css'

export default {
  name: 'ContrastChecker',
  props: { palette: Array },
  setup(props) {
    const pairs = computed(() => {
      const bg = '#ffffff'
      return props.palette.map(c => {
        const ratio = getContrast(c.hex, bg)
        let level = 'Fail'
        if (ratio >= 7) level = 'AAA'
        else if (ratio >= 4.5) level = 'AA'
        return { fg: c.hex, bg, ratio, level }
      })
    })
    return { pairs }
  }
}
</script>