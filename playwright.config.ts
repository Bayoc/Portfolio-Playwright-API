import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['TEST_USER_EMAIL', 'TEST_USER_PASSWORD'] as const;
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) throw new Error(`Missing required environment variable: ${envVar}`);
}

export const ENV = {
    email: process.env.TEST_USER_EMAIL as string,
    password: process.env.TEST_USER_PASSWORD as string,
    registerEmail: process.env.TEST_REGISTER_EMAIL as string,
    registerPassword: process.env.TEST_REGISTER_PASSWORD as string,
    toDeleteEmail: process.env.TEST_TODELETE_EMAIL as string,
    toDeletePassword: process.env.TEST_TODELETE_PASSWORD as string,
    rbAdminLogin: process.env.RB_ADMIN_LOGIN as string,
    rbAdminPassword: process.env.RB_ADMIN_PASSWORD as string,
};

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'https://automationexercise.com',
        extraHTTPHeaders: {
            'Accept': 'application/json',
        },
    },
});