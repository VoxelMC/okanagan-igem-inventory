/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	corePlugins: {
		preflight: false
	},
	plugins: [require("daisyui"), require("@tailwindcss/typography")],
	theme: {
		extend: {
			borderWidth: {
				'none': "0!important"
			}
		},
	},
	daisyui: {
		logs: false,
		darkTheme: "dark",
		themes: [
			"dark",
			"dracula",
			"emerald"
		]
	}
}
