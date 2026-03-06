import { expect } from '@playwright/test';

export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.zipCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.successMessage = page.locator('[data-test="complete-header"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillDeliveryInfo(firstName, lastName, zip) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zip);
    }

    async continue() {
        await this.continueButton.waitFor({ state: 'visible' });
        await this.continueButton.click();
    }

    async finish() {
        await this.finishButton.waitFor({ state: 'visible' });
        await this.finishButton.click();
    }

    async assertSuccess() {
        await expect(this.successMessage).toBeVisible({ timeout: 15000 });
        await expect(this.successMessage).toHaveText('Thank you for your order!');
    }

    async assertError(expected) {
        await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
        await expect(this.errorMessage).toHaveText(expected);
    }
}