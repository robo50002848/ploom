import { Page, Locator } from '@playwright/test';
import { AgeConfirmationEnum } from '../../enums/AgeConfirmationEnum.enum';

export class AgeConfirmationPopup {
    readonly confirmAgeButton: Locator;
    readonly declineAgeButton: Locator;

    constructor(private readonly page: Page) {
        this.confirmAgeButton = page.locator("//div[contains(@class, 'confirmBtn')]");
        this.declineAgeButton = page.locator("//div[contains(@class, 'leaveBtn')]");
    }

    async handleAgeConfirmation(option: AgeConfirmationEnum): Promise<void> {
        switch (option) {
            case AgeConfirmationEnum.CONFIRM:
                await this.confirmAgeButton.click();
                break;
            case AgeConfirmationEnum.LEAVE:
                await this.declineAgeButton.click();
                break;
            default:
                throw new Error(`Unknown option: ${option}`);
        }
    }
}