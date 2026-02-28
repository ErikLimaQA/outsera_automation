// tests/api/posts.api.spec.js
import { test, expect } from '@playwright/test';
import { expectSuccessResponse, expectErrorResponse } from './utils/api-helpers';

test.describe('API Tests - JSONPlaceholder /posts endpoint', () => {
  test('GET /posts - Listagem completa (positivo)', async ({ request }) => {
    const response = await request.get('/posts');
    const body = await expectSuccessResponse(response);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(100);
  });

  test('GET /posts/1 - Post individual (positivo)', async ({ request }) => {
    const response = await request.get('/posts/1');
    const body = await expectSuccessResponse(response);
    expect(body.id).toBe(1);
  });

  test('GET /posts/999999 - Post inexistente (negativo - 404)', async ({ request }) => {
    const response = await request.get('/posts/999999');
    await expect(response.status()).toBe(404);
  });

  test('POST /posts - Criação válida (positivo)', async ({ request }) => {
    const payload = {
      title: 'Novo post',
      body: 'Conteúdo válido',
      userId: 1,
    };

    const response = await request.post('/posts', { data: payload });
    const body = await expectSuccessResponse(response, 201);
    expect(body.title).toBe(payload.title);
    expect(body.id).toBeGreaterThan(100);
  });

  test('POST /posts - Payload inválido (string) (negativo - retorna 201 ou 500)', async ({ request }) => {
    const response = await request.post('/posts', { data: 'não sou json' });
    // JSONPlaceholder pode retornar 201 ou 500 (não consistente)
    // Aceitamos ambos como "comportamento do mock"
    const status = response.status();
    expect([201, 500]).toContain(status);
  });

  // PUT em ID fixo válido (positivo - simula atualização)
  test('PUT /posts/1 - Atualização em post existente (positivo)', async ({ request }) => {
    const payload = {
      id: 1,
      title: 'Atualizado',
      body: 'Conteúdo modificado',
      userId: 1,
    };

    const response = await request.put('/posts/1', { data: payload });
    const body = await expectSuccessResponse(response, 200);
    expect(body.title).toBe(payload.title);
  });

  // PUT em ID inexistente (negativo - 500)
  test('PUT /posts/999999 - Atualização inexistente (negativo)', async ({ request }) => {
    const payload = { title: 'Tentativa inválida' };
    const response = await request.put('/posts/999999', { data: payload });
    await expect(response.status()).toBe(500);
  });

  // DELETE em ID fixo (positivo - retorna 200)
  test('DELETE /posts/1 - Remoção (positivo)', async ({ request }) => {
    const response = await request.delete('/posts/1');
    await expect(response.status()).toBe(200);
  });

  // DELETE em ID inexistente (negativo - retorna 200)
  test('DELETE /posts/999999 - Remoção inexistente (negativo)', async ({ request }) => {
    const response = await request.delete('/posts/999999');
    await expect(response.status()).toBe(200);
  });
});