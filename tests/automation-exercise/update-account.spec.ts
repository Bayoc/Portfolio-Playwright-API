import { test, expect } from '@playwright/test';
import { ENV } from '../../playwright.config';
import { ENDPOINTS, HttpMethod } from '../../data/automation-exercises/endpoints';
import { generateNativeUnsupportedMethodsTests } from '../../helpers/automation-exercises/api-helpers';
import { userData, updatedUser } from '../../data/automation-exercises/user.data'

test.describe('PUT /api/updateAccount', () => {

    test.describe('Positive Scenarios', () => {

        test.beforeAll(async ({ request }) => {
            const response = await request.post(ENDPOINTS.AE.CREATE_ACCOUNT, {
                form: userData
            });
            expect(response.status()).toBe(200);
        });

        test.afterAll(async ({ request }) => {
            // cleanup - delete account
            const deleteResponse = await request.delete(ENDPOINTS.AE.DELETE_ACCOUNT, {
                form: {
                    email: ENV.registerEmail,
                    password: ENV.registerPassword,
                }

            });
            const deleteBody = await deleteResponse.json();
            expect(deleteResponse.status()).toBe(200);
            expect(deleteBody.responseCode).toBe(200);
        });

        test('PUT Update User Account - User data should be updated', async ({ request }) => {

            const response = await request.put(ENDPOINTS.AE.UPDATE_ACCOUNT, {
                form: updatedUser
            });

            expect(response.status()).toBe(200);

            const body = await response.json();
            expect(body.responseCode).toBe(200);
            expect(body.message).toBe('User updated!');
        });

    });

    test.describe('Negative Scenarios', () => {
        generateNativeUnsupportedMethodsTests(ENDPOINTS.AE.UPDATE_ACCOUNT, [HttpMethod.GET, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH]);
    });
});