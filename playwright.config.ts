import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 120000,
    expect: {
        timeout: 120000,
    },
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI? 1 : 4,
    use: {
        headless: process.env.CI ? true : false,
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