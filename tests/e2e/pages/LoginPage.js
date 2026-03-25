import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;

        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: /login/i });
        this.flash = page.locator('#flash');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/login', { waitUntil: 'domcontentloaded' });
        await expect(this.page).toHaveURL(/\/login$/);
        await expect(this.username).toBeVisible({ timeout: 30000 });
    }

    async fillCredentials(username, password) {
        await this.username.fill(username ?? '');
        await this.password.fill(password ?? '');
    }

    async submit() {
        await expect(this.loginButton).toBeVisible({ timeout: 30000 });
        await expect(this.loginButton).toBeEnabled({ timeout: 30000 });
        await this.loginButton.click();
    }

    async login(username, password) {
        await this.fillCredentials(username, password);
        await this.submit();
        await expect(this.flash).toBeVisible({ timeout: 40000 });
    }

    async assertSuccess() {
        await expect(this.flash).toBeVisible({ timeout: 15000 });
        await expect(this.flash).toContainText(/You logged into a secure area!/i);
    }

    async assertError(expected) {
        await expect(this.flash).toBeVisible({ timeout: 15000 });
        const escaped = expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        await expect(this.flash).toContainText(new RegExp(escaped, 'i'));
    }
}