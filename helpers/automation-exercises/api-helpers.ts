import { expect, APIResponse } from '@playwright/test';

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