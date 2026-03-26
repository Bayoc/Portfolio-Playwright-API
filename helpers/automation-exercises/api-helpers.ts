import { expect, APIResponse } from '@playwright/test';
import { HttpMethod } from '../../data/automation-exercises/endpoints';

export async function expectMethodNotSupported(response: APIResponse) {
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
}


export async function expectEmptyProductsList(response: APIResponse) {
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.products).toBeDefined();
    expect(body.products).toHaveLength(0);
}

import { test } from '@playwright/test';
// upewnij się, że masz zaimportowaną tu też swoją funkcję expectMethodNotSupported

export function generateUnsupportedMethodsTests(endpoint: string, methodsToTest: string[]) {
    test.describe('Automated Unsupported Methods Scenarios', () => {

        for (const method of methodsToTest) {
            test(`should return 200 but contain 405 in body when using ${method} method`, async ({ request }) => {
                const response = await request.fetch(endpoint, { method: method, data: '' });
                await expectMethodNotSupported(response);
            });
        }

        // KNOWN BUG: Inconsistent API behavior. 
        // For PATCH, the server returns a native HTTP 405 status instead of HTTP 200 with a custom JSON error.
        test('should return 200 and JSON 405 for PATCH (Currently BUGGED)', async ({ request }) => {
            test.fail(true, 'BUG-124: Inconsistent error handling for PATCH');
            const response = await request.fetch(endpoint, { method: HttpMethod.PATCH, data: '' });
            await expectMethodNotSupported(response);
        });
    });
}
