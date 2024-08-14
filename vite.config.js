import {
    defineConfig,
    splitVendorChunkPlugin,
    transformWithEsbuild,
    loadEnv,
} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import removeConsole from 'vite-plugin-remove-console';

const devEnv = 'https://dev-web';
const prodEnv = 'https://prod-web';

const finalProxy = devEnv;

const defineIdChunk = (id) => {
    let chunkName;

    // for certain packages which form significant part of bundles,
    // separate chunks are created
    // the chunks can be loaded on demand or in parallel which helps in performance
    if (id.includes('node_modules')) {
        switch (true) {
            case id.includes('@tanstack/react-table'):
                chunkName = 'vendor_tanstack_react-table';
                break;
            case id.includes('@mui'):
                chunkName = 'vendor_mui';
                break;
            default:
                chunkName = 'vendor';
        }
    }

    return chunkName;
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        define: {
            'process.env': process.env,
        },
        build: {
            rollupOptions: {
                output: {
                    assetFileNames: (assetInfo) => {
                        let extType = assetInfo.name.split('.').at(1);

                        if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                            extType = 'img';
                        }
                        return `assets/${extType}/[name]-[hash][extname]`;
                    },
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                },
            },
        },
        server: {
            proxy: {
                '/api/v1/': {
                    target: finalProxy,
                    changeOrigin: true,
                    ws: true
                }
                // -----------------------------------------------------------------------------------------------------------------------------------
            },
        },
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: path.resolve(__dirname, 'src'),
                },
                {
                    find: 'ui',
                    replacement: path.resolve(__dirname, 'src', 'ui'),
                },
                {
                    find: 'config',
                    replacement: path.resolve(__dirname, 'src', 'config'),
                },
                {
                    find: 'assets',
                    replacement: path.resolve(__dirname, 'src', 'assets'),
                },
                {
                    find: 'lib',
                    replacement: path.resolve(__dirname, 'src', 'lib'),
                },
                {
                    find: 'routes',
                    replacement: path.resolve(__dirname, 'src', 'routes'),
                },
                {
                    find: 'util',
                    replacement: path.resolve(__dirname, 'src', 'util'),
                },
            ],
        },
        plugins: [
            react(),
            svgr(),
            splitVendorChunkPlugin(),
            removeConsole(),
            {
                name: 'treat-js-files-as-jsx',
                async transform(code, id) {
                    if (!id.match(/src\/.*\.js$/)) return null;

                    // Use the exposed transform from vite, instead of directly
                    // transforming with esbuild
                    return transformWithEsbuild(code, id, {
                        loader: 'jsx',
                        jsx: 'automatic',
                    });
                },
            },
        ],
        optimizeDeps: {
            force: true,
            esbuildOptions: {
                loader: {
                    '.js': 'jsx',
                },
            },
            exclude: ['js-big-decimal']
        },
    };
});
