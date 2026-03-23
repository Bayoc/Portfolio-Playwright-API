import { test, expect } from '@playwright/test';

function assertSecurityHeaders(headers: Record<string, string>) {
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBe('same-origin');
}

test.describe('Headers tests', () => {


    test('GET All Products - should return correct security headers', async ({ request }) => {
        const response = await request.get('/api/productsList');
        const headers = response.headers();
        // Content header test
        expect(headers['content-type']).toContain('text/html');

        assertSecurityHeaders(headers);
    });


    test('POST Search Product - should return correct security headers', async ({ request }) => {

        const response = await request.post('/api/searchProduct', {
            form: {
                search_product: 'Blue Top'
            }
        });
        const headers = response.headers();
        expect(headers['content-type']).toContain('text/html');

        assertSecurityHeaders(headers);

    });

    test('PUT Brands List - should return security headers even on 405', async ({ request }) => {
        const response = await request.put('/api/brandsList');
        const headers = response.headers();

        assertSecurityHeaders(headers);
    });

});