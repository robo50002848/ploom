import { Locator, Page } from '@playwright/test';
import { HeaderMenu } from './pageFragments/HeaderMenu';
import { LocaleEnum } from '../enums/LocaleEnum.enum';
import { NotificationPopup } from './popups/NotificationPopup';

export class BasePage {
    protected readonly page: Page;
    protected readonly locale: LocaleEnum;
    readonly menu: HeaderMenu;
    readonly notification: NotificationPopup;
    readonly headerLogo: Locator;

    constructor(page: Page, locale: LocaleEnum) {
        this.page = page;
        this.locale = locale;
        this.menu = new HeaderMenu(page, locale);
        this.notification = new NotificationPopup(page);
        this.headerLogo = page.locator('//a[@data-testid="headerLogo"]').first();
    }
}