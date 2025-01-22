/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{ts,tsx}',
	  './components/**/*.{ts,tsx}',
	  './app/**/*.{ts,tsx}',
	  './src/**/*.{ts,tsx}',
	],
	theme: {
	  extend: {
		colors: {
		  primary: {
			DEFAULT: "#00FFFF", // Cyan
			foreground: "#FFFFFF",
		  },
		  secondary: {
			DEFAULT: "#FF00FF", // Magenta
			foreground: "#FFFFFF",
		  },
		  background: {
			light: "#F0F0F0",
			dark: "#121212", // Darker background for better contrast
		  },
		  foreground: {
			light: "#333333",
			dark: "#E0E0E0", // Lighter text for better readability in dark mode
		  },
		  accent: {
			DEFAULT: "#FFFF00", // Yellow
			foreground: "#000000",
		  },
		  destructive: {
			DEFAULT: "#FF3333", // Red for destructive actions
			foreground: "#FFFFFF",
		  },
		  card: {
			light: "#FFFFFF", 
			dark: "#1F1F1F", // Darker card background
		  },
		},
		boxShadow: {
		  neon: '0 0 5px #00FFFF, 0 0 20px #00FFFF',
		  'neon-strong': '0 0 5px #00FFFF, 0 0 20px #00FFFF, 0 0 40px #00FFFF',
		  'card-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for cards
		},
		keyframes: {
		  pulse: {
			'0%, 100%': { opacity: 1 },
			'50%': { opacity: 0.5 },
		  },
		  float: {
			'0%, 100%': { transform: 'translateY(0)' },
			'50%': { transform: 'translateY(-10px)' },
		  },
		},
		animation: {
		  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		  float: 'float 3s ease-in-out infinite',
		},
	  },
	},
	plugins: [require("tailwindcss-animate"), require("@nextui-org/react")],
  };
  