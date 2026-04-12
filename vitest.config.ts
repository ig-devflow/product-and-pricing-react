import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import viteConfig from './vite.config';

const resolvedViteConfig =
  typeof viteConfig === 'function'
    ? viteConfig({
        command: 'serve',
        mode: 'test',
        isSsrBuild: false,
        isPreview: false,
      })
    : viteConfig;

export default mergeConfig(
  resolvedViteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      globals: true,
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
);
