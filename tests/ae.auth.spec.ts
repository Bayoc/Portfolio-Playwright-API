import { test, expect } from '@playwright/test';
import { ENV } from '../playwright.config';

test.describe('Login API', () => {

    test('POST Verify Login - valid credentials', async ({ request }) => {
        const response = await request.post('/api/verifyLogin', {
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

    test('POST Verify Login - invalid credentials', async ({ request }) => {
        const response = await request.post('/api/verifyLogin', {
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
        const response = await request.post('/api/verifyLogin', {
            form: {
                password: ENV.password
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(400);
        expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });

});