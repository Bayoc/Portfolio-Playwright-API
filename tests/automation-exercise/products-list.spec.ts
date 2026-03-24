import { test, expect } from '@playwright/test';
import { ENDPOINTS } from '../../data/endpoints';

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

        const unsupportedMethods = ['POST', 'PUT', 'DELETE'];

        for (const method of unsupportedMethods) {

            test(`should return 200 but contain 405 in body when using ${method} method`, async ({ request }) => {

                const response = await request.fetch(ENDPOINTS.AE.PRODUCTS_LIST, {
                    method: method
                });

                expect(response.status()).toBe(200);
                const body = await response.json();
                expect(body.responseCode).toBe(405);
                expect(body.message).toBe('This request method is not supported.');
            });
        }

        test('should return 200 and JSON 405 for PATCH (Currently BUGGED)', async ({ request }) => {
            test.fail(true, 'BUG-123: Inconsistent error handling for PATCH');

            const response = await request.fetch(ENDPOINTS.AE.PRODUCTS_LIST, { method: 'PATCH' });
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.responseCode).toBe(405);
            expect(body.message).toBe('This request method is not supported.');
        });
    });

    test.describe('Edge Cases & Unexpected Inputs', () => {

        test('should ignore undocumented query parameters and return 200 with full list', async ({ request }) => {
            const response = await request.get(`${ENDPOINTS.AE.PRODUCTS_LIST}?limit=2&invalidParam=true`);

            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.products.length).toBeGreaterThan(2);
        });
    });

});