import { Page, Locator } from '@playwright/test';
import { HeaderMenuEnum, HeaderMenuText } from '../../enums/HeaderMenuEnum.enum';
import { LocaleEnum } from '../../enums/LocaleEnum.enum';

export class HeaderMenu {
    private readonly menuLocators: Record<HeaderMenuEnum, Locator>;

    constructor(private readonly page: Page, locale: LocaleEnum) {
        this.menuLocators = {
            [HeaderMenuEnum.WHY_PLOOM]: page.getByText(HeaderMenuText[HeaderMenuEnum.WHY_PLOOM][locale]).first(),
            [HeaderMenuEnum.SHOP]: page.getByText(HeaderMenuText[HeaderMenuEnum.SHOP][locale]).first(),
            [HeaderMenuEnum.PLOOM_CLUB]: page.getByText(HeaderMenuText[HeaderMenuEnum.PLOOM_CLUB][locale]).first(),
            [HeaderMenuEnum.SUPPORT]: page.getByText(HeaderMenuText[HeaderMenuEnum.SUPPORT][locale]).first(),
            [HeaderMenuEnum.BLOG]: page.getByText(HeaderMenuText[HeaderMenuEnum.BLOG][locale]).first(),
            [HeaderMenuEnum.SPECIAL_OFFERS]: page.getByText(HeaderMenuText[HeaderMenuEnum.SPECIAL_OFFERS][locale]).first()
        };
    }

    async clickOnMenuOption(option: HeaderMenuEnum): Promise<void> {
        const menuItem = this.menuLocators[option];

        if (!menuItem) {
            throw new Error(`Unknown menu option: ${option}`);
        }

        await menuItem.click();
    }
}