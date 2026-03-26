import { test, expect } from '@playwright/test';
import { ENV } from '../../playwright.config';
import { ENDPOINTS, HttpMethod } from '../../data/automation-exercises/endpoints';
import {  generateUnsupportedMethodsTests } from '../../helpers/automation-exercises/api-helpers';

test.describe('POST /api/verifyLogin', () => {

    test.describe('Positive Scenarios', () => {
        test('POST Verify Login - valid credentials', async ({ request }) => {
            const response = await request.post(ENDPOINTS.AE.VERIFY_LOGIN, {
                form: {
                    email: ENV.email,
                    password: ENV.password
                }
            });
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.responseCode).toBe(200);
            expect(body.message).toBe('User exists!');
        });

    });

    test.describe('Negative Scenarios', () => {
        test('POST Verify Login - invalid credentials', async ({ request }) => {
            const response = await request.post(ENDPOINTS.AE.VERIFY_LOGIN, {
                form: {
                    email: 'invalid@example.com',
                    password: 'wrongpassword'
                }
            });
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.responseCode).toBe(404);
            expect(body.message).toBe('User not found!');
        });

        test('POST Verify Login - missing email parameter', async ({ request }) => {
            const response = await request.post(ENDPOINTS.AE.VERIFY_LOGIN, {
                form: {
                    // intentional missing email
                    password: ENV.password
                }
            });
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.responseCode).toBe(400);
            expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
        });

        generateUnsupportedMethodsTests(ENDPOINTS.AE.VERIFY_LOGIN, [HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE]);
    });
});