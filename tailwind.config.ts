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
      maxWidth: {
        'md': '500px',
      },
      fontFamily: {
        geologica: ['Geologica', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        base: ['13px', '20px'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#097355",
          foreground: "#FFFFFF",
          hover: "#056144",
        },
        secondary: {
          DEFAULT: "#F1F0FB",
          foreground: "#1A1F2C",
          hover: "#E5E4F5",
        },
        success: {
          DEFAULT: "#4CAF50",
          foreground: "#FFFFFF",
          hover: "#43A047",
        },
        destructive: {
          DEFAULT: "#ea384c",
          foreground: "#FFFFFF",
          hover: "#D32F2F",
        },
        warning: {
          DEFAULT: "#F97316",
          foreground: "#FFFFFF",
          hover: "#EA580C",
        },
        accent: {
          DEFAULT: "#097355",
          foreground: "#FFFFFF",
          hover: "#056144",
        },
        muted: {
          DEFAULT: "#F8F9FA",
          foreground: "#6C757D",
          hover: "#E9ECEF",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;