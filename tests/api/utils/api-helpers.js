// tests/api/utils/api-helpers.js
import { expect } from '@playwright/test';

export async function expectSuccessResponse(response, expectedStatus = 200) {
  await expect(response.status()).toBe(expectedStatus);
  const contentType = response.headers()['content-type'] || '';
  if (expectedStatus === 200 || expectedStatus === 201) {
    await expect(contentType).toContain('application/json');
  }
  const body = await response.json().catch(() => null);
  if (body) await expect(body).toBeDefined();
  return body;
}

export async function expectErrorResponse(response, expectedStatus) {
  await expect(response.status()).toBe(expectedStatus);
  const body = await response.json().catch(() => ({}));
}