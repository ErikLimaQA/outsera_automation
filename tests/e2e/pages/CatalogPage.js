import { expect } from '@playwright/test';

export class CatalogPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: /login/i });
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
        await expect(this.usernameInput).toBeVisible({ timeout: 20000 });
    }

    async login(username, password) {
        await this.usernameInput.fill(username ?? '');
        await this.passwordInput.fill(password ?? '');
        await this.loginButton.click();
        await expect(this.page).toHaveURL(/inventory\.html/);
    }

    async addProductByName(productName) {
        // Cada produto é um .inventory_item; filtramos pelo nome
        const itemCard = this.page.locator('.inventory_item').filter({ hasText: productName });
        await expect(itemCard).toBeVisible({ timeout: 15000 });
        const addBtn = itemCard.getByRole('button', { name: /add to cart/i });
        await addBtn.click();
    }

    async goToCart() {
        await expect(this.cartLink).toBeVisible({ timeout: 10000 });
        await this.cartLink.click();
        await expect(this.page).toHaveURL(/cart\.html/);
    }
}