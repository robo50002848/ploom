import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LocaleEnum } from '../enums/LocaleEnum.enum';
import { Product } from '../models/Product';
import { PriceHelper } from '../utils/PriceHelper';

export class ProductPage extends BasePage {
    readonly addProductToCartButton: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;

    constructor(page: Page, locale: LocaleEnum) {
        super(page, locale);
        this.addProductToCartButton = page.locator("[data-testid='pdpAddToProduct']");
        this.productName = page.locator("//div[contains(@class, 'product-heading')]/h1");
        this.productPrice = page.locator("//span[@data-testid='finalPrice']/span[contains(@class, 'FormattedPrice')]");
    }

    async addProductToCart(): Promise<Product> {
        const name = (await this.productName.textContent())?.trim() ?? "Unknown";
        const price = await PriceHelper.getFormattedPrice(this.productPrice, this.locale);

        const product: Product = { name, price };
        await this.addProductToCartButton.click();

        return product;
    }
}