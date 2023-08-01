/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'ui-sans-serif'],
            },
            fontSize: {
                xxs: '0.6rem',
            },
        },
    },
    plugins: [import('@tailwindcss/forms')],
};
