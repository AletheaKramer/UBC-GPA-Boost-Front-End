/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("daisyui"),
	],
	daisyui: {
		themes: ["light", "dark", "cupcake",
			{
				mytheme: {
					"primary": "#4a3377",
					"secondary": "#7c67a8",
					"accent": "#7d719d",
					"neutral": "#ffffff",
					"base-100": "#f8f6ff",
					"info": "#00d5ff",
					"success": "#00ab00",
					"warning": "#ffaa00",
					"error": "#ff6986",
				},
			},
		],
	},
}
