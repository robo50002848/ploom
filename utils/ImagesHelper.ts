import { Locator, Page } from "@playwright/test";

export class ImagesHelper {
    static async checkImages(page: Page, images: Locator): Promise<string[]> {
        await page.waitForLoadState('networkidle');
        
        const allImages = await images.all();
        let brokenImages: string[] = [];
    
        const concurrencyLimit = 5;
        const imageBatches: Locator[][] = [];
    
        for (let i = 0; i < allImages.length; i += concurrencyLimit) {
            imageBatches.push(allImages.slice(i, i + concurrencyLimit));
        }
    
        for (const batch of imageBatches) {
            await Promise.all(batch.map(async (image) => {
                let src = await image.getAttribute('src');
                if (!src) {
                    brokenImages.push(`Image is missing src attribute`);
                    return;
                }
    
                src = ImagesHelper.getFullUrl(page, src);
    
                try {
                    const response = await page.request.get(src, { timeout: 15000 });
                    if (!response.ok()) {
                        brokenImages.push(`${src} - Status: ${response.status()}`);
                    }
                } catch (error) {
                    brokenImages.push(`${src} - Broken image (Error: ${error})`);
                }
            }));
        }
    
        return brokenImages;
    }

    private static getFullUrl(page: Page, src: string): string {
        if (src.startsWith('/')) {
            return `${page.url().split('/').slice(0, 3).join('/')}${src}`;
        }
        return src;
    }
}