import { test, expect } from '@playwright/test';
import { markets } from '../data/markets';
import { HomePage } from '../pages/HomePage';
import { ShopPage } from '../pages/ShopPage';
import { CookiesPopup } from '../pages/popups/CookiesPopup';
import { AgeConfirmationPopup } from '../pages/popups/AgeConfirmationPopup';
import { CookiesEnum } from '../enums/CookiesEnum.enum';
import { AgeConfirmationEnum } from '../enums/AgeConfirmationEnum.enum';
import { HeaderMenuEnum } from '../enums/HeaderMenuEnum.enum';
import { ProductPage } from '../pages/ProductPage';
import { CartPreviewPage } from '../pages/CartPreviewPage';
import { CartPage } from '../pages/CartPage';
import { Product } from '../models/Product';
import { PriceHelper } from '../utils/PriceHelper';
import { LinksHelper } from '../utils/LinksHelper';
import { ImagesHelper } from '../utils/ImagesHelper';

test.describe.parallel("Tests for different markets", () => {
    markets.forEach((market) => {
        test.describe(`Tests for market: ${market.name}`, () => {
            let homePage: HomePage;
            let shopPage: ShopPage;
            let productPage: ProductPage;
            let cookiesPopup: CookiesPopup;
            let ageConfirmationPopup: AgeConfirmationPopup;
            let cartPreviewPage: CartPreviewPage;
            let cartPage: CartPage;
            const locale = market.locale;

            test.beforeEach(async ({ page }) => {
                homePage = new HomePage(page, locale, market.url);
                shopPage = new ShopPage(page, locale);
                productPage = new ProductPage(page, locale);
                cookiesPopup = new CookiesPopup(page);
                ageConfirmationPopup = new AgeConfirmationPopup(page);
                cartPreviewPage = new CartPreviewPage(page, locale);
                cartPage = new CartPage(page, locale);

                await page.goto(market.url);
                await cookiesPopup.handleCookies(CookiesEnum.ACCEPT);
                await ageConfirmationPopup.handleAgeConfirmation(AgeConfirmationEnum.CONFIRM);
                await expect(cookiesPopup.acceptButton).not.toBeVisible();
                await expect(ageConfirmationPopup.confirmAgeButton).not.toBeVisible();
            });

            test(`Add product to cart - ${market.name}`, async ({ page }) => {
                await homePage.menu.clickOnMenuOption(HeaderMenuEnum.SHOP);
                await expect(shopPage.productList).toBeVisible();

                await shopPage.openProductBySku(market.sku);
                await expect(productPage.addProductToCartButton).toBeVisible();

                const product: Product = {
                    name: (await productPage.productName.textContent())?.trim() ?? 'Unknown',
                    price: await PriceHelper.getFormattedPrice(productPage.productPrice, locale)
                };
                await productPage.addProductToCart();
                await expect(productPage.notification.toaster).toBeVisible();
                await expect(cartPreviewPage.productCount).toContainText("1");
                await expect(cartPreviewPage.products).toHaveCount(1);
                await expect(cartPreviewPage.quantityInput.first()).toHaveValue('1');

                await cartPreviewPage.checkoutButton.click();
                await expect(cartPage.checkoutButton).toBeVisible();
                await expect(cartPage.product).toHaveCount(1);
                await expect(cartPage.quantityInput.first()).toHaveValue('1');

                await expect(cartPage.productName.last()).toHaveText(product.name);
                await expect(cartPage.productPrice.first()).toHaveText(new RegExp(`^${product.price}\\s*\\D*$`));
            });

            test(`Remove product from cart - ${market.name}`, async ({ page }) => {
                await homePage.menu.clickOnMenuOption(HeaderMenuEnum.SHOP);
                await expect(shopPage.productList).toBeVisible();

                await shopPage.openProductBySku(market.sku);
                await expect(productPage.addProductToCartButton).toBeVisible();

                const product: Product = {
                    name: (await productPage.productName.textContent())?.trim() ?? 'Unknown',
                    price: await PriceHelper.getFormattedPrice(productPage.productPrice, locale)
                };
                await productPage.addProductToCart();
                await expect(productPage.notification.toaster).toBeVisible();

                await cartPreviewPage.checkoutButton.click();
                await expect(cartPage.checkoutButton).toBeVisible();

                (await cartPage.getRemoveProductButton(product)).click();
                await cartPage.removeProductPopup.save();
                await expect(cartPage.product).toHaveCount(0);
            });

            test(`Check product page for broken links and images - ${market.name}`, async ({ page }) => {
                await homePage.menu.clickOnMenuOption(HeaderMenuEnum.SHOP);
                await expect(shopPage.productList).toBeVisible();

                await shopPage.openProductBySku(market.sku);
                await expect(productPage.addProductToCartButton).toBeVisible();

                const brokenLinks = await LinksHelper.checkLinks(page, shopPage.link, market.url);
                expect(
                    brokenLinks.length,
                    `Broken links found:\n${brokenLinks.join('\n')}`
                ).toBe(0);

                const brokenImages = await ImagesHelper.checkImages(page, shopPage.image);
                expect(
                    brokenImages.length,
                    `Broken images found:\n${brokenImages.join('\n')}`
                ).toBe(0);
            });
        });
    });
});