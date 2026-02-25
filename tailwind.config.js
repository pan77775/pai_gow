/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                casino: {
                    green: '#5b896b',
                    darkgreen: '#42684f',
                    gold: '#e6c86a',
                    blue: '#4ca5d4',
                    red: '#d13838',
                }
            },
            boxShadow: {
                '3d-btn': 'inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 6px rgba(0,0,0,0.5), 0 8px 15px rgba(0,0,0,0.3)',
                '3d-btn-pressed': 'inset 0 3px 6px justifyrgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.2)',
                'tile': 'inset -2px -2px 6px rgba(0,0,0,0.8), inset 2px 2px 5px rgba(255,255,255,0.2), 3px 3px 5px rgba(0,0,0,0.5)'
            }
        },
    },
    plugins: [],
}
