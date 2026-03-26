import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'node:fs';

// Caso tenha DOTENV_PATH definido, usamos ele.
// Caso contrário, carregamos .env normal.
const dotenvPath = process.env.DOTENV_PATH || '.env';

if (fs.existsSync(dotenvPath)) {
  dotenv.config({ path: dotenvPath, override: true });
} else {
  console.warn(`⚠️ Arquivo ${dotenvPath} não encontrado. Falha ao carregar env.`);
}

export default defineConfig({
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  timeout: 30000,

  projects: [
    {
      name: `api-${process.env.ENV || 'dev'}`,
      testDir: 'tests/api',
      use: {
        baseURL: process.env.API_BASEURL,
        extraHTTPHeaders: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    }
  ]
});