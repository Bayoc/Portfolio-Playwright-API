import { test, expect } from '@playwright/test';

test.describe('Products API', () => {

    test('GET All Products - should return 200 and product list', async ({ request }) => {
        const response = await request.get('/api/productsList');

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(200);
        expect(body.products).toBeDefined();
        expect(body.products.length).toBeGreaterThan(0);
    });

    test('POST To All Products List - should return 405 Method Not Allowed', async ({ request }) => {
        const response = await request.post('/api/productsList');

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

    test('GET All Brands - should return 200 and brands list', async ({ request }) => {
        const response = await request.get('/api/brandsList');

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(200);
        expect(body.brands).toBeDefined();
        expect(body.brands.length).toBeGreaterThan(0);
    });

    test('POST Search Product - should return matching products', async ({ request }) => {
        const response = await request.post('/api/searchProduct', {
            form: {
                search_product: 'Blue Top'
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(200);
        expect(body.products.length).toBeGreaterThan(0);
        expect(body.products[0].name).toContain('Blue Top');
    });

    test('PUT To All Brands List - should return 405 Method Not Allowed', async ({ request }) => {
        const response = await request.put('/api/brandsList');

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

    test('POST Search Product without search_product parameter', async ({ request }) => {
        const response = await request.post('/api/searchProduct', {
                // intentional missing parameter    
        });
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(400);
        expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
    });

    

});