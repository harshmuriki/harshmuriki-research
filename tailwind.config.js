module.exports = {
	mode: 'jit',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			// Matte "warm paper" palette: off-white page, warm charcoal in dark mode
			colors: {
				paper: '#F5F2EC',
				charcoal: '#1C1B19',
				ink: '#1F1D1A',
				bone: '#EDE9E2',
			},
		},
	},
	variants: {
		extend: {
			filter: ['hover'],
		},
	}
}
