/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Main color palette - elegant accents only
        'mcgennis-gold': '#B89968',         // Satin brushed brass accent
        'mcgennis-maroon': '#800020',       // Dark red maroon accent
        'mcgennis-navy': '#1B2845',         // Dark navy accent
        'mcgennis-forest': '#2F4538',       // Forest green accent
        // Legacy (alias to new colors)
        'mcgennis-brass': '#C5A572',        // Same as gold
        'mcgennis-blue': '#1B2845',         // Same as navy
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'brass-metal': 'linear-gradient(135deg, #9D8555 0%, #C4A876 25%, #B89968 50%, #C4A876 75%, #9D8555 100%)',
        'brass-horizontal': 'linear-gradient(to right, #9D8555 0%, #B89968 25%, #C4A876 50%, #B89968 75%, #9D8555 100%)',
        'brass-button': 'linear-gradient(145deg, #A88757 0%, #C4A876 45%, #B89968 55%, #9D8555 100%)',
      }
    },
  },
  plugins: [],
}
