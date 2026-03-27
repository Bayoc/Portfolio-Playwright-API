import { test, expect, RB_URL } from '../../data/restful-booker/fixtures';
import { ENDPOINTS } from '../../data/restful-booker/endpoints';
import { ENV } from '../../playwright.config';



test.describe('POST /auth - Create Token', () => {

    test('POST CreateToken - should return auth token', async ({ request }) => {
        const response = await request.post(`${RB_URL}${ENDPOINTS.RB.CREATE_TOKEN}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            data: {
                username: ENV.rbAdminLogin,
                password: ENV.rbAdminPassword
            }

        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.token).toBeDefined();
    });
});
