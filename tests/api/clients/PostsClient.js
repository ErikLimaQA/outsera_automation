import path from 'node:path';
import { validateSchema } from '../utils/validateSchema.js';

export class PostsClient {
    constructor(request) {
        this.request = request;
        this.root = process.cwd();
    }

    async get(id = '') {
        const response = await this.request.get(`/posts/${id}`);
        const json = await response.json();

        // Valida contrato apenas quando a API retorna um objeto (post individual)
        if (!Array.isArray(json)) {
            validateSchema(
                json,
                path.join(this.root, 'tests/api/schemas/post.schema.json')
            );
        }

        return { response, json };
    }

    async create(payload) {
        const response = await this.request.post('/posts', { data: payload });
        const json = await response.json();

        validateSchema(
            json,
            path.join(this.root, 'tests/api/schemas/post.schema.json')
        );

        return { response, json };
    }

    async update(id, payload) {
        const response = await this.request.put(`/posts/${id}`, { data: payload });
        const json = await response.json();

        validateSchema(
            json,
            path.join(this.root, 'tests/api/schemas/post.schema.json')
        );

        return { response, json };
    }

    async remove(id) {
        const response = await this.request.delete(`/posts/${id}`);
        return response;
    }
}