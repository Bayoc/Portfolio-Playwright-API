import { test, expect } from '@playwright/test';
import { ENDPOINTS, HttpMethod } from '../../data/endpoints';
import { expectMethodNotSupported } from '../../helpers/api-helpers';

test.describe('POST Search Product API', () => {

    test.describe('Positive Scenarios', () => {

        test('should return matching products when search_product parameter is provided', async ({ request }) => {
            const response = await request.post(ENDPOINTS.AE.SEARCH_PRODUCT, {
                form: {
                    search_product: 'Blue Top'
                }
            });

            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.responseCode).toBe(200);
            expect(body.products.length).toBeGreaterThan(0);
            expect(body.products[0].name).toContain('Blue Top');
        });
    });

    test.describe('Negative Scenarios', () => {

        test('should return 400 bad request when search_product parameter is missing', async ({ request }) => {
            const response = await request.post(ENDPOINTS.AE.SEARCH_PRODUCT, {
                // intentional missing parameter    
            });
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.responseCode).toBe(400);
            expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
        });

        const unsupportedMethods = [HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE];

        for (const method of unsupportedMethods) {
            test(`should return 200 but contain 405 in body when using ${method} method`, async ({ request }) => {
                const response = await request.fetch(ENDPOINTS.AE.SEARCH_PRODUCT, { method: method, data: '' }); //timeout protection with empty data
                await expectMethodNotSupported(response);
            });
        }
    });
});