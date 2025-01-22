/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '500px',          // Custom screen size (small screens)
        '920sc': "920px",       // Custom screen size for medium-sized devices
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      zIndex: {
        '10000': '10000', // Custom z-index for layers that require higher stacking
      },
      gridTemplateColumns: {
        '3': 'repeat(3, minmax(0, 1fr))',  // Defines 3 equal columns
      },
      gridTemplateRows: {
        '1': '1fr',            // A single row that takes up equal space
        'dynamic': 'auto',     // Rows adjust based on content size
      },
      gridTemplateAreas: {
        'default': '"g1 g2 g3"',
        'explore1': '"p1 p2 p3" "p1 p4 p5"', // First pattern (explore1)
        'explore2': '"p2 p3 p1" "p4 p5 p1"'  // Second pattern (explore2)
      },
      spacing: {
        '18': '4.5rem', // Custom spacing size (4.5rem)
        '36': '9rem',   // Custom spacing size (9rem)
      },
      aspectRatio: {
        '1': '1', // 1:1 aspect ratio for square elements
        '16/9': '16/9', // 16:9 aspect ratio (common for videos)
        '4/3': '4/3', // 4:3 aspect ratio (another common ratio)
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.grid-areas': {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',  // Default: 3 equal columns
          gridTemplateRows: '1fr',
          gap: '0px 15px',     // Adjust the gap between the grid items
          gridAutoFlow: 'row', // Items should flow by row
          gridTemplateAreas: '"g1 g2 g3"', // Default grid structure
        },
        '.dynamic-grid': {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Dynamic grid
          gap: '16px',  // Dynamic spacing between items
        },
      });
    },
  ],
};
