import { expect } from '@playwright/test';

export class SecurePage {
    constructor(page) {
        this.page = page;
        this.flash = page.locator('#flash');
        this.logoutButton = page.getByRole('link', { name: /logout/i });
    }

    async assertLoggedIn() {
        await expect(this.page).toHaveURL(/\/secure/);
        await expect(this.flash).toBeVisible({ timeout: 15000 });
        await expect(this.flash).toContainText(/You logged into a secure area!/i);
    }

    async logout() {
        await expect(this.logoutButton).toBeVisible({ timeout: 15000 });
        await this.logoutButton.click();
    }

    async assertLoggedOut() {
        await expect(this.page).toHaveURL(/\/login$/);
    }
}