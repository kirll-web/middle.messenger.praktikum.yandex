import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: resolve(__dirname, '../src'),
    server: { port: 3000 },

    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, '../src/partials')
        })
    ],
    build: {
        outDir: resolve(__dirname, '../dist'),
        rollupOptions: {
            input: resolve(__dirname, '../src/index.html')
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src'),
            '@styles': resolve(__dirname, '../src/styles') 
        }
    },
    assetsInclude: ['**/*.hbs']
});
