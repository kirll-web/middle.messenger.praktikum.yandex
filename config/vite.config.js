import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: resolve(__dirname, '../src'),
    server: { port: 3000 },

    plugins: [handlebars()],
    build: {
        outDir: resolve(__dirname, '../dist'),
        rollupOptions: {
            input: resolve(__dirname, '../src/index.html')
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src'),
            '@styles': resolve(__dirname, '../src/styles'),
            '@app': resolve(__dirname, '../src/app'),
            '@assets': resolve(__dirname, '../src/assets'),
            '@shared': resolve(__dirname, '../src/shared'),
            '@pages': resolve(__dirname, '../src/pages'),
            '@entities': resolve(__dirname, '../src/entities')
        }
    },
    assetsInclude: ['**/*.hbs'],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@shared/styles/variables.scss" as *;`
            }
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            reporter: ['text', 'html']
        }
    }
});
