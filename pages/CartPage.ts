import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LocaleEnum } from '../enums/LocaleEnum.enum';
import { RemoveProductPopup } from './popups/RemoveProductPopup';

export class CartPage extends BasePage {
    readonly removeProductPopup: RemoveProductPopup;
    readonly checkoutButton: Locator;
    readonly quantityInput: Locator;
    readonly product: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly removeProductButton: Locator;

    constructor(page: Page, locale: LocaleEnum) {
        super(page, locale);
        this.removeProductPopup = new RemoveProductPopup(page);
        this.quantityInput = page.locator("[data-testid='cartQuantity']");
        this.checkoutButton = page.locator("[data-testid='loginCheckoutButton']");
        this.product = page.locator("//div[@data-testid='regular-cart-list']");
        this.productName = this.product.locator("//strong[contains(@class, 'productName')]");
        this.productPrice = this.product.locator("//span[contains(@class, 'FormattedPrice')]")
        this.removeProductButton = this.product.locator("[data-testid='cartRemoveButton']")
    }

    async getRemoveProductButton(product: { name: string; price: string }): Promise<Locator> {
        const productElement = this.product.locator(`xpath=./div//strong[contains(@class, 'productName') and contains(text(), '${product.name}')]`);
        const productPriceElement = productElement.locator(`xpath=./ancestor::div[@data-testid='main-section']//span[contains(@class, 'FormattedPrice') and contains(text(), '${product.price}')]`);
        const productRemoveButton = productPriceElement.locator("xpath=./ancestor::div[@data-testid='main-section']//button[@data-testid='cartRemoveButton']");

        return productRemoveButton;
    }
}