// Генерация случайного HEX
export const randomHex = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase()

// HEX → RGB
export const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

// Конвертация HEX в HSL (для вычислений)
const hexToHsl = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16) / 255
  let g = parseInt(hex.slice(3, 5), 16) / 255
  let b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) h = s = 0
  else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return [h * 360, s * 100, l * 100]
}

// HSL → HEX
const hslToHex = (h, s, l) => {
  l /= 100
  const a = s * Math.min(l, 1 - l) / 100
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
}

// Случайная палитра
export const randomPalette = (n) => Array.from({ length: n }, randomHex)

// Аналогичная (±30°)
export const analogousPalette = (base, n = 5) => {
  const [h, s, l] = hexToHsl(base)
  const step = 30
  const res = []
  for (let i = 0; i < n; i++) {
    const angle = h + (i - Math.floor(n / 2)) * step
    res.push(hslToHex(angle, s, l))
  }
  return res
}

// Комплементарная (180°)
export const complementaryPalette = (base, n = 5) => {
  const [h, s, l] = hexToHsl(base)
  return [
    base,
    hslToHex(h + 180, s, l),
    hslToHex(h + 150, s, l),
    hslToHex(h + 210, s, l),
    hslToHex(h + 90, s, l),
  ].slice(0, n)
}

// Триада (±120°)
export const triadicPalette = (base, n = 5) => {
  const [h, s, l] = hexToHsl(base)
  return [
    base,
    hslToHex(h + 120, s, l),
    hslToHex(h + 240, s, l),
    hslToHex(h + 60, s, l),
    hslToHex(h + 180, s, l),
  ].slice(0, n)
}

// Контрастность (WCAG)
export const getContrast = (hex1, hex2) => {
  const luminance = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255
    let g = parseInt(hex.slice(3, 5), 16) / 255
    let b = parseInt(hex.slice(5, 7), 16) / 255
    const s = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    return 0.2126 * s(r) + 0.7152 * s(g) + 0.0722 * s(b)
  }
  const l1 = luminance(hex1)
  const l2 = luminance(hex2)
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  return ratio
}