import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: process.env.CI ? 120000 : 30000,
    expect: {
        timeout: process.env.CI ? 60000 : 30000,
    },
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI? 1 : 6,
    use: {
        headless: process.env.CI ? true : false,
        viewport: process.env.CI ? { width: 1920, height: 1080 } : null,
        launchOptions: {
            args: ['--start-maximized'],
        },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    reporter: process.env.CI
        ? [['junit', { outputFile: 'test-results/junit-report.xml' }], ['html', { outputFolder: 'playwright-report' }]]
        : [['list']],
    outputDir: 'test-results/',
});