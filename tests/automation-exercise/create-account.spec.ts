import { test, expect } from '@playwright/test';
import { ENV } from '../../playwright.config';
import { ENDPOINTS, HttpMethod } from '../../data/automation-exercises/endpoints';
import { generateNativeUnsupportedMethodsTests } from '../../helpers/automation-exercises/api-helpers';
import { userData } from '../../data/automation-exercises/user.data'

test.describe('POST /api/createAccount', () => {

    test.afterEach(async ({ request }) => {
        // cleanup - delete account
        const deleteResponse = await request.delete(ENDPOINTS.AE.DELETE_ACCOUNT, {
            form: {
                email: ENV.registerEmail,
                password: ENV.registerPassword,
            }
        });
    });

    test.describe('Positive Scenarios', () => {

        test('POST Register user account with valid credentials', async ({ request }) => {

            const response = await request.post(ENDPOINTS.AE.CREATE_ACCOUNT, {
                form: userData
            });

            expect(response.status()).toBe(200);

            const body = await response.json();
            expect(body.responseCode).toBe(201);
            expect(body.message).toBe('User created!');
        });

    });
    test.describe('Negative Scenarios', () => {
        
        generateNativeUnsupportedMethodsTests(ENDPOINTS.AE.CREATE_ACCOUNT, [HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH]);

    });
});
