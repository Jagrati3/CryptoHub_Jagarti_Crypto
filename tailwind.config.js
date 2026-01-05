/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Deep background tones
                dark: {
                    DEFAULT: '#0b0e11', // Main background
                    surface: '#151c25', // Cards/Modals
                    lighter: '#1e2736', // Hover states
                },
                // Brand accents
                primary: {
                    DEFAULT: '#00f3ff', // Cyan
                    glow: 'rgba(0, 243, 255, 0.5)', 
                    dark: '#00a3cc',
                },
                secondary: {
                    DEFAULT: '#bc00dd', // Neon Purple
                    glow: 'rgba(188, 0, 221, 0.5)',
                },
                // Text colors
                text: {
                    primary: '#f0f4f8',
                    secondary: '#94a3b8',
                    muted: '#64748b',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'], // Good for crypto numbers
            },
            boxShadow: {
                'neon': '0 0 10px rgba(0, 243, 255, 0.3), 0 0 20px rgba(0, 243, 255, 0.1)',
                'neon-purple': '0 0 10px rgba(188, 0, 221, 0.3), 0 0 20px rgba(188, 0, 221, 0.1)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
            animation: {
                'fade-in-down': 'fadeInDown 0.6s ease-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out both',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeInDown: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(-20px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
        },
    },
    plugins: [],
}
