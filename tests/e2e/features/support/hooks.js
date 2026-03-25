import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

setDefaultTimeout(60 * 1000);

Before(async function () {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    fs.mkdirSync('reports/screenshots', { recursive: true });
});

After(async function (scenario) {
    try {
        if (scenario.result?.status === 'FAILED') {
            const name = scenario.pickle?.name?.replace(/[^\w\-]+/g, '_') ?? `failed_${Date.now()}`;
            const filePath = path.join('reports', 'screenshots', `${name}.png`);
            await this.page.screenshot({ path: filePath, fullPage: true });
        }
    } catch (_) {
        // ignora erro de screenshot
    } finally {
        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();
    }
});