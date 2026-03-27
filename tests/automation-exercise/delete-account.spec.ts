import { test, expect } from '@playwright/test';
import { ENV } from '../../playwright.config';
import { ENDPOINTS, HttpMethod } from '../../data/automation-exercises/endpoints';
import { generateNativeUnsupportedMethodsTests } from '../../helpers/automation-exercises/api-helpers';
import { userData } from '../../data/automation-exercises/user.data'

test.describe('DELETE /api/deleteAccount', () => {

    test.describe('Positive Scenarios', () => {

        test.beforeEach(async ({ request }) => {
            const response = await request.post(ENDPOINTS.AE.CREATE_ACCOUNT, {
                form: userData
            });
            expect(response.status()).toBe(200);
        });

        test('DELETE Account - account should be deleted', async ({ request }) => {
            const deleteResponse = await request.delete(ENDPOINTS.AE.DELETE_ACCOUNT, {
                form: {
                    email: ENV.toDeleteEmail,
                    password: ENV.toDeletePassword,
                }
            });
            expect(deleteResponse.status()).toBe(200);
            const deleteBody = await deleteResponse.json();
            expect(deleteBody.responseCode).toBe(404);
        });


    });
    test.describe('Negative Scenarios', () => {

        generateNativeUnsupportedMethodsTests(ENDPOINTS.AE.DELETE_ACCOUNT, [HttpMethod.GET, HttpMethod.PUT, HttpMethod.POST, HttpMethod.PATCH]);

    });
});
