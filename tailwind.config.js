module.exports = {
	purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
	darkMode: false,
	theme: {
		fontFamily: {
			sans: ['"Lucida Sans Unicode"', '"Lucida Grande"', 'sans-serif']
		},
		extend: {
			colors: {
				primary: '#ffea00',
				secondary: '#333333'
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.gray.50'),

						a: {
							color: theme('colors.primary'),
							textDecoration: 'none',
							'&:hover': {
								color: theme('colors.primary'),
								textDecoration: 'underline'
							}
						},
						strong: {
							color: theme('colors.primary')
						}
					}
				},
				sm: {
					css: {
						hr: {
							marginTop: theme('spacing.4'),
							marginBottom: theme('spacing.4')
						}
					}
				}
			})
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography')]
};
