import { expect } from '@playwright/test';
import { test } from '@playwright/test';
import { PostsClient } from './clients/PostsClient.js';

test.describe('API Tests - Posts (com Clients + Contrato)', () => {

  test('GET /posts - lista completa', async ({ request }) => {
    const client = new PostsClient(request);
    const { response, json } = await client.get('');

    expect(response.ok()).toBeTruthy();
    expect(Array.isArray(json)).toBeTruthy();
    expect(json.length).toBeGreaterThan(0);
  });

  test('GET /posts/1 - post individual', async ({ request }) => {
    const client = new PostsClient(request);
    const { json } = await client.get(1);

    expect(json.id).toBe(1);
  });

  test('POST /posts - criação válida', async ({ request }) => {
    const client = new PostsClient(request);
    const payload = { title: 'Hello', body: 'World', userId: 1 };

    const { json } = await client.create(payload);

    expect(json.title).toBe(payload.title);
  });
});