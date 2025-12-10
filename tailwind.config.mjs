/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Main color palette - elegant accents only
        'mcgennis-gold': '#D4AF37',         // Classy gold accent
        'mcgennis-maroon': '#800020',       // Dark red maroon accent
        'mcgennis-navy': '#1B2845',         // Dark navy accent
        'mcgennis-forest': '#2F4538',       // Forest green accent
        // Legacy (alias to new colors)
        'mcgennis-brass': '#D4AF37',        // Same as gold
        'mcgennis-blue': '#1B2845',         // Same as navy
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
