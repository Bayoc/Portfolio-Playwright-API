import { test, expect } from '@playwright/test';
import { ENDPOINTS, HttpMethod } from '../../data/automation-exercises/endpoints';
import { generateUnsupportedMethodsTests } from '../../helpers/automation-exercises/api-helpers';


test.describe('GET /api/brandsList - Brands Collection', () => {

    test.describe('Positive Scenarios', () => {

        test('GET All Brands - should return 200 and brands list', async ({ request }) => {
            const response = await request.get(ENDPOINTS.AE.BRANDS_LIST);
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.responseCode).toBe(200);
            expect(body.brands).toBeDefined();
            expect(body.brands.length).toBeGreaterThan(0);
        });
    });

    test.describe('Negative Scenarios', () => {
        // Unsuported method funcion 
        generateUnsupportedMethodsTests(ENDPOINTS.AE.BRANDS_LIST, [HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE]);
    });


});