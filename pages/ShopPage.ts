import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LocaleEnum } from '../enums/LocaleEnum.enum';

export class ShopPage extends BasePage {
    readonly productList: Locator;
    readonly link: Locator;
    readonly image: Locator;

    constructor(page: Page, locale: LocaleEnum) {
        super(page, locale);
        this.productList = page.locator('[data-testid="all_skus"]');
        this.link = page.locator('a');
        this.image = page.locator('img');
    }

    async openProductBySku(sku: string): Promise<void> {
        await this.headerLogo.hover();
        await this.page.locator(`[data-sku='${sku}']`).click();
    }
}