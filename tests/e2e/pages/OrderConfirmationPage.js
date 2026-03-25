import { expect } from '@playwright/test';

export class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.header = page.getByRole('heading', { name: /thank you for your order/i });
    }

    async assertOrderComplete() {
        await expect(this.page).toHaveURL(/checkout-complete\.html/);
        await expect(this.header).toBeVisible({ timeout: 15000 });
    }
}