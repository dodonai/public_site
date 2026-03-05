/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts,md}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
