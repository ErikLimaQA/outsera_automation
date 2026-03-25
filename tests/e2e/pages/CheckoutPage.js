import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder(/first name/i);
    this.lastName = page.getByPlaceholder(/last name/i);
    this.postalCode = page.getByPlaceholder(/zip|postal/i);
    this.continueButton = page.getByRole('button', { name: /continue/i });
    this.finishButton = page.getByRole('button', { name: /finish/i });
    this.error = page.locator('[data-test="error"]');
  }

  async fillShipping(first, last, zip) {
    await expect(this.firstName).toBeVisible({ timeout: 15000 });
    await this.firstName.fill(first ?? '');
    await this.lastName.fill(last ?? '');
    await this.postalCode.fill(zip ?? '');
  }

  async continue() {
    await this.continueButton.click();
    // Se houver erro de validação, permanece nesta página e [data-test="error"] fica visível
  }

  async finish() {
    // Normalmente já estamos na checkout-step-two (overview)
    await expect(this.finishButton).toBeVisible({ timeout: 15000 });
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
  }

  async assertErrorContains(message) {
    // Escape correto para uso em RegExp
    const escaped = message.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(this.error).toBeVisible({ timeout: 10000 });
    await expect(this.error).toContainText(new RegExp(escaped, 'i'));
  }
}