<template>
  <label class="color-picker">
    {{ label }}
    <input
      type="color"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span>{{ modelValue }}</span>
  </label>
</template>

<script>
import './ColorPicker.css'
export default {
  name: 'ColorPicker',
  props: {
    modelValue: { type: String, required: true },
    label: { type: String, default: 'Цвет' }
  },
  emits: ['update:modelValue']
}
</script>