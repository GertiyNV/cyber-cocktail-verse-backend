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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
        cyber: {
          DEFAULT: '#1A1F2C',
          dark: '#121419',
          muted: '#8E9196',
          accent: '#403E43',
          neon: '#00F0FF',
          pink: {
            DEFAULT: '#FF0077',
            dark: '#D40066',
            light: '#FF44A1',
          },
          purple: '#7928CA',
          yellow: '#F5A623',
        },
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
        'pulse-neon': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(0, 240, 255, 0.6), 0 0 15px rgba(0, 240, 255, 0.4), 0 0 25px rgba(0, 240, 255, 0.2)'
          },
          '50%': { 
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.9), 0 0 20px rgba(0, 240, 255, 0.6), 0 0 30px rgba(0, 240, 255, 0.3)'
          },
        },
        'pulse-pink': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(255, 0, 119, 0.6), 0 0 15px rgba(255, 0, 119, 0.4), 0 0 25px rgba(255, 0, 119, 0.2)'
          },
          '50%': { 
            boxShadow: '0 0 10px rgba(255, 0, 119, 0.9), 0 0 20px rgba(255, 0, 119, 0.6), 0 0 30px rgba(255, 0, 119, 0.3)'
          },
        },
        'text-glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-2px, 2px)' },
          '20%': { transform: 'translate(2px, -2px)' },
          '30%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '50%': { transform: 'translate(-2px, 2px)' },
          '60%': { transform: 'translate(2px, -2px)' },
          '70%': { transform: 'translate(-2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '90%': { transform: 'translate(-2px, 2px)' },
        },
        'slot-machine': {
          '0%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-500%)' },
          '40%': { transform: 'translateY(-1000%)' },
          '60%': { transform: 'translateY(-1500%)' },
          '80%': { transform: 'translateY(-2000%)' },
          '100%': { transform: 'translateY(-2500%)' },
        },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-neon': 'pulse-neon 2s infinite',
        'pulse-pink': 'pulse-pink 2s infinite',
        'text-glitch': 'text-glitch 0.3s ease-in-out',
        'slot-machine': 'slot-machine 0.5s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
