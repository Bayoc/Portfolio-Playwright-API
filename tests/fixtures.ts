import { test as base, request as baseRequest } from '@playwright/test';

const RB_URL = 'https://restful-booker.herokuapp.com';

type RbFixtures = {
    rbToken: string;
};

export const test = base.extend<RbFixtures>({
    rbToken: async ({}, use) => {
        const context = await baseRequest.newContext();
        const response = await context.post(`${RB_URL}/auth`, {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
        const body = await response.json();
        await use(body.token);
        await context.dispose();
    }
});

export { expect } from '@playwright/test';
export { RB_URL };