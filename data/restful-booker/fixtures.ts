import { test as base, request as baseRequest } from '@playwright/test';
import { ENV } from '../../playwright.config';


const RB_URL = 'https://restful-booker.herokuapp.com';

type RbFixtures = {
    rbToken: string;
};

export const test = base.extend<RbFixtures>({
    rbToken: async ({}, use) => {
        const context = await baseRequest.newContext();
        const response = await context.post(`${RB_URL}/auth`, {
            data: {
                username: ENV.rbAdminLogin,
                password: ENV.rbAdminPassword
            }
        });
        const body = await response.json();
        await use(body.token);
        await context.dispose();
    }
});

export { expect } from '@playwright/test';
export { RB_URL };