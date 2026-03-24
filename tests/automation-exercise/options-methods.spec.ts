import { test, expect } from '@playwright/test';
import { ENDPOINTS } from '../../data/endpoints';

test.describe('Security & HTTP Methods', () => {

    test('should return correct allowed methods in OPTIONS request', async ({ request }) => {
        const response = await request.fetch(ENDPOINTS.AE.PRODUCTS_LIST, {
            method: 'OPTIONS'
        });

        expect(response.status()).toBe(200);
        const allowedMethods = response.headers()['allow'];
        expect(allowedMethods).toBeDefined();

        expect(allowedMethods).toContain('GET');
        expect(allowedMethods).toContain('POST');
        expect(allowedMethods).toContain('PUT');
        expect(allowedMethods).toContain('OPTIONS');

        expect(allowedMethods).not.toContain('PATCH');
    });
});