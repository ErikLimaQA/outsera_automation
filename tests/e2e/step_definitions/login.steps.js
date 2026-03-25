import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage.js';
import { SecurePage } from '../pages/SecurePage.js';

Given('que estou na página de login', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
});

When('preencho usuário {string} e senha {string}', async function (username, password) {
    const loginPage = new LoginPage(this.page);
    await loginPage.fillCredentials(username, password);
});

When('clico em Login', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.submit();
});

When('clico em Login sem preencher usuário e senha', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.fillCredentials('', '');
    await loginPage.submit();
});

Then('vejo mensagem de sucesso {string}', async function (_message) {
    const securePage = new SecurePage(this.page);
    await securePage.assertLoggedIn();
});

Then('vejo mensagem de erro {string}', async function (message) {
    const loginPage = new LoginPage(this.page);
    await loginPage.assertError(message);
});