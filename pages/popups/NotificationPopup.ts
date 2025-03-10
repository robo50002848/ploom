import { Page, Locator } from '@playwright/test';

export class NotificationPopup {
    readonly page: Page;
    readonly toaster: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toaster = page.locator("//div[contains(@class, 'Toaster')]").first();
    }
}