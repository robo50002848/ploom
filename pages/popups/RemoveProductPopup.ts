import { Locator, Page } from '@playwright/test';

export class RemoveProductPopup {
    readonly removeProductPopup: Locator;
    readonly cancelButton: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.removeProductPopup = page.locator("//div[@data-testid='dialog']/div[contains(@class, 'RemoveItemDialog')]").first();
        this.cancelButton = this.removeProductPopup.locator("//button[contains(@data-testid, 'cancel')]").first();
        this.saveButton = this.removeProductPopup.locator("//button[contains(@data-testid, 'remove') and contains(@class, 'primary')]");
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }
}