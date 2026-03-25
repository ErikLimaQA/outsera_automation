import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: /checkout/i });
        this.cartItems = page.locator('.cart_item');
    }

    async proceedToCheckout() {
        await expect(this.checkoutButton).toBeVisible({ timeout: 15000 });
        await this.checkoutButton.click();
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    }
}