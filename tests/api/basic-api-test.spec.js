// tests/api/basic-api-test.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Basic API Tests - JSONPlaceholder', () => {
  test('GET /posts returns 200 and 100 items', async ({ request }) => {
    const response = await request.get('/posts');

    await expect(response).toBeOK();
    await expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];
    await expect(contentType).toContain('application/json');

    const body = await response.json();
    await expect(Array.isArray(body)).toBe(true);
    await expect(body.length).toBe(100);
  });
});