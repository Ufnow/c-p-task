import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests/e2e',
  use: {
    baseURL: 'http://localhost:4200',
    browserName: 'chromium',
  },
  webServer: {
    command: 'ng serve',
    port: 4200,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env['CI'],
  },
});
