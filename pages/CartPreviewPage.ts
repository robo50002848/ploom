import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LocaleEnum } from '../enums/LocaleEnum.enum';

export class CartPreviewPage extends BasePage {
    readonly cartPreview: Locator;
    readonly productCount: Locator;
    readonly products: Locator;
    readonly quantityInput: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page, locale: LocaleEnum) {
        super(page, locale);
        this.cartPreview = page.locator("//div[@data-testid='mini-cart-header']");
        this.productCount = this.cartPreview.locator("//div[contains(@class, 'module-count')]");
        this.products = page.locator("//div[@data-variant]");
        this.quantityInput = page.locator("[data-testid='cartQuantity']");
        this.checkoutButton = page.locator("[data-testid='miniCartCheckoutButton']");
    }
}