
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Three-color system with consistent blue
        primary: {
          DEFAULT: "#4361EE", // Main blue
          light: "#647EF5", // Lighter blue for hover states
          dark: "#3249D8", // Darker blue for active states
        },
        accent: {
          DEFAULT: "#4361EE", // Same blue for consistency
          light: "#647EF5",
          dark: "#3249D8",
        },
        // System colors mapped to our three-color system
        border: "#E5E5E5",
        input: "#000000",
        ring: "#4361EE",
        background: "#FFFFFF",
        foreground: "#000000",
        secondary: {
          DEFAULT: "#F5F5F5",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "#000000",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#666666",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
      },
      fontSize: {
        // Consistent typography scale
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        // Consistent spacing scale
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: 'gradient 8s linear infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
