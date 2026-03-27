import { test, expect } from '@playwright/test';
import { ENV } from '../../playwright.config';
import { ENDPOINTS, HttpMethod } from '../../data/automation-exercises/endpoints';
import { generateUnsupportedMethodsTests } from '../../helpers/automation-exercises/api-helpers';

test.describe('GET api/getUserDetailByEmail', () => {

    test.describe('Positive Scenarios', () => {
        test('GET User Account Detail By Email - should return user details', async ({ request }) => {
            const response = await request.get(ENDPOINTS.AE.USER_DETAIL_BY_EMAIL, {
                params: {
                    email: ENV.email
                }
            });

            expect(response.status()).toBe(200);

            const body = await response.json();
            expect(body.responseCode).toBe(200);
            expect(body.user).toBeDefined();
            expect(body.user.email).toBe(ENV.email);
        });
    });

    test.describe('Negative Scenarios', () => {

        test('GET User Account Detail - unregistered email', async ({ request }) => {
            const response = await request.get(ENDPOINTS.AE.USER_DETAIL_BY_EMAIL, {
                params: { email: 'nieistnieje@example.com' }
            });
            const body = await response.json();
            expect(body.responseCode).toBe(404);
        });

        test('GET User Account Detail - missing email parameter', async ({ request }) => {
            const response = await request.get(ENDPOINTS.AE.USER_DETAIL_BY_EMAIL); 
            const body = await response.json();
            expect(body.responseCode).toBe(400);
        });

        generateUnsupportedMethodsTests(ENDPOINTS.AE.USER_DETAIL_BY_EMAIL, [HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE]);
    });
});
