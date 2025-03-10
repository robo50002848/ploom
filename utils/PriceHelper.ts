import { Page, Locator } from '@playwright/test';
import { LocaleEnum } from '../enums/LocaleEnum.enum';

export class PriceHelper {
    static async getFormattedPrice(element: Locator, locale: LocaleEnum): Promise<string> {
        const priceText = (await element.textContent())?.trim();
        if (!priceText) {
            throw new Error("Nie udało się pobrać ceny.");
        }

        let formattedPrice = priceText.replace(/\s*(zł|PLN|\$|EUR)\s*/g, '');

        if (locale === LocaleEnum.EN) {
            formattedPrice = formattedPrice.replace(',', '.');
        }

        return formattedPrice;
    }
}