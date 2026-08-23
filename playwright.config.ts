import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    // Базова адреса з урахуванням HTTP Basic Auth для доступу до стенду
    baseURL: 'https://guest:welcome2qauto@qauto.forstudy.space',
    trace: 'on-first-retry',
  },
  projects: [
    // 1. Setup проект, який відповідає за логін і збереження auth state
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    // 2. Основний проект, що залежить від setup і виконує тести
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      dependencies: ['setup'],
    },
  ],
});