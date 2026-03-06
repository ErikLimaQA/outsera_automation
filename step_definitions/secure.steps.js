import { Given, When, Then } from '@cucumber/cucumber';  // corrigido
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { SecurePage } from '../pages/SecurePage.js';

Given('que estou logado como {string} com senha {string}', async function (username, password) {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.login(username, password);
    await loginPage.loginButton.click();
});

When('adiciono o produto {string} ao carrinho', async function (product) {
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.addBackpackToCart();
});

When('vou para o carrinho', async function () {
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.goToCart();
});

When('clico em Checkout', async function () {
    const cartPage = new CartPage(this.page);
    await cartPage.goToCheckout();
});

When('preencho dados de entrega {string}, {string}, {string}', async function (firstName, lastName, zip) {
    const checkoutPage = new SecurePage(this.page);
    await checkoutPage.fillDeliveryInfo(firstName, lastName, zip);
    await checkoutPage.continue();
});

When('preencho apenas nome {string} e sobrenome {string} (sem CEP)', async function (firstName, lastName) {
    const checkoutPage = new SecurePage(this.page);
    await checkoutPage.fillDeliveryInfo(firstName, lastName, '');
    await checkoutPage.continue();
});

When('clico em Continue', async function () {
    const checkoutPage = new SecurePage(this.page);
    await checkoutPage.continue();
});

When('clico em Finish', async function () {
    const checkoutPage = new SecurePage(this.page);
    await checkoutPage.finish();
});

Then('vejo mensagem de sucesso {string}', async function (message) {
    const checkoutPage = new SecurePage(this.page);
    await checkoutPage.assertSuccess();
});