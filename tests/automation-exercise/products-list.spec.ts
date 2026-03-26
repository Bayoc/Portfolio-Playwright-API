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
        // Unsuported method funcion
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

});