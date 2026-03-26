import { test, expect } from '@playwright/test';
import { ENDPOINTS, HttpMethod } from '../../data/automation-exercises/endpoints';
import { generateUnsupportedMethodsTests } from '../../helpers/automation-exercises/api-helpers';

test.describe('GET /api/productsList - Products Collection', () => {

    test.describe('Positive Scenarios', () => {

        test('GET All Products - should return 200 and product list', async ({ request }) => {
            const response = await request.get(ENDPOINTS.AE.PRODUCTS_LIST);
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.responseCode).toBe(200);
            expect(body.products).toBeDefined();
            expect(body.products.length).toBeGreaterThan(0);
        });
    });

    test.describe('Negative Scenarios', () => {
        generateUnsupportedMethodsTests(ENDPOINTS.AE.PRODUCTS_LIST, [HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE]);
    });


    test.describe('Edge Cases & Unexpected Inputs', () => {

        test('should ignore undocumented query parameters and return 200 with full list', async ({ request }) => {
            const response = await request.get(`${ENDPOINTS.AE.PRODUCTS_LIST}?limit=2&invalidParam=true`);

            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.products.length).toBeGreaterThan(2);
        });
    });

    test.describe('Security & HTTP Methods', () => {

        test('should return correct allowed methods in OPTIONS request', async ({ request }) => {
            const response = await request.fetch(ENDPOINTS.AE.PRODUCTS_LIST, { method: 'OPTIONS' });

            expect(response.status()).toBe(200);
            const allowedMethods = response.headers()['allow'];
            expect(allowedMethods).toBeDefined();

            expect(allowedMethods).toContain(HttpMethod.GET);
            expect(allowedMethods).toContain(HttpMethod.POST);
            expect(allowedMethods).toContain(HttpMethod.PUT);
            expect(allowedMethods).toContain(HttpMethod.OPTIONS);

            expect(allowedMethods).not.toContain(HttpMethod.PATCH);
        });
    });
});