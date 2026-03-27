import { test, expect, RB_URL } from '../../data/restful-booker/fixtures';


test.describe('GET /ping - Health Check', () => {
    test('GET HealthCheck - should return 201', async ({ request }) => {
        const response = await request.get(`${RB_URL}/ping`)
        expect(response.status()).toBe(201);
    });
});