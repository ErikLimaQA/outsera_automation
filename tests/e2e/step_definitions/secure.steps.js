import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { SecurePage } from '../pages/SecurePage.js';

Given('que estou logado como {string} com senha {string}', async function (username, password) {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.login(username, password);

    const securePage = new SecurePage(this.page);
    await securePage.assertLoggedIn();
});

Then('vejo botão de logout', async function () {
    const securePage = new SecurePage(this.page);
    await expect(securePage.logoutButton).toBeVisible();
});

When('clico em Logout', async function () {
    const securePage = new SecurePage(this.page);
    await securePage.logout();
});

Then('sou redirecionado para a página de login', async function () {
    const securePage = new SecurePage(this.page);
    await securePage.assertLoggedOut();
});