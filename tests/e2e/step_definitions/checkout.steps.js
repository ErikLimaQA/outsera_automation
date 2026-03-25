// tests/e2e/step_definitions/checkout.steps.js
import { Given, When, Then } from '@cucumber/cucumber';
import { CatalogPage } from '../pages/CatalogPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage.js';

Given(
    'que estou no catálogo do e-commerce autenticado como {string} e senha {string}',
    async function (username, password) {
        const catalog = new CatalogPage(this.page);
        await catalog.goto();
        await catalog.login(username, password);
    }
);

When(
    'adiciono os produtos {string} e {string} ao carrinho',
    async function (p1, p2) {
        const catalog = new CatalogPage(this.page);
        await catalog.addProductByName(p1);
        await catalog.addProductByName(p2);
    }
);

When('adiciono o produto {string} ao carrinho', async function (product) {
    const catalog = new CatalogPage(this.page);
    await catalog.addProductByName(product);
});

When('vou para o carrinho e inicio o checkout', async function () {
    const catalog = new CatalogPage(this.page);
    await catalog.goToCart();

    const cart = new CartPage(this.page);
    await cart.proceedToCheckout();
});

When(
    'preencho os dados de envio: primeiro nome {string}, último nome {string}, CEP {string}',
    async function (first, last, zip) {
        const checkout = new CheckoutPage(this.page);
        await checkout.fillShipping(first, last, zip);
        await checkout.continue();
    }
);

When('finalizo a compra', async function () {
    const checkout = new CheckoutPage(this.page);
    await checkout.finish();
});

Then(
    'vejo a confirmação de pedido com a mensagem {string}',
    async function (_msg) {
        const confirm = new OrderConfirmationPage(this.page);
        await confirm.assertOrderComplete();
    }
);

Then('vejo erro no checkout contendo {string}', async function (message) {
    const checkout = new CheckoutPage(this.page);
    await checkout.assertErrorContains(message);
});