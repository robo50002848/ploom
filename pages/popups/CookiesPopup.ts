import { Page, Locator } from '@playwright/test';
import { CookiesEnum } from '../../enums/CookiesEnum.enum';

export class CookiesPopup {
    readonly acceptButton: Locator;
    readonly rejectButton: Locator;

    constructor(private readonly page: Page) {
        this.acceptButton = page.locator("#onetrust-accept-btn-handler");
        this.rejectButton = page.locator("#onetrust-reject-all-handler");
    }

    async handleCookies(option: CookiesEnum): Promise<void> {
        switch (option) {
            case CookiesEnum.ACCEPT:
                await this.acceptButton.click();
                break;
            case CookiesEnum.REJECT:
                await this.rejectButton.click();
                break;
            default:
                throw new Error(`Unknown option: ${option}`);
        }
    }
}