import { Locator, Page } from "@playwright/test";

export class LinksHelper {
    static async checkLinks(page: Page, links: Locator, marketUrl: string): Promise<string[]> {
        const allLinks = await links.all();
        let brokenLinks: string[] = [];

        for (const link of allLinks) {
            try {
                if (!(await link.isVisible())) {
                    continue;
                }

                let href = await link.getAttribute('href', { timeout: 5000 });

                if (!href) {
                    continue;
                }

                if (href.startsWith('javascript:') || href.startsWith('#') ||
                    href.startsWith('tel:') || href.startsWith('mailto:') ||
                    href.startsWith('sms:') || href.startsWith('skype:') ||
                    href.startsWith('whatsapp:') || href.startsWith('facetime:')) {
                    continue;
                }

                if (href.startsWith('/')) {
                    href = `${marketUrl}${href}`;
                }

                const response = await page.request.get(href);
                const status = response.status();

                if (status !== 200) {
                    brokenLinks.push(`${href} - Status: ${status}`);
                }
            } catch (error) {
                brokenLinks.push(`Error checking link: ${error}`);
            }
        }

        return brokenLinks;
    }
}