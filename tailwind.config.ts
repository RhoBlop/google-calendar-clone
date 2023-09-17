import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

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
    plugins: [forms],
} satisfies Config;
