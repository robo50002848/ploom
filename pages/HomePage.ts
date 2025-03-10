import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LocaleEnum } from '../enums/LocaleEnum.enum';

export class HomePage extends BasePage {
    private readonly url: string;

    constructor(page: Page, locale: LocaleEnum, url: string) {
        super(page, locale);
        this.url = url;
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }
}