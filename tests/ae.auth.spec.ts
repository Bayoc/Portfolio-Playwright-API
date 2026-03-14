import { test, expect } from '@playwright/test';
import { ENV } from '../playwright.config';
import { UserAccount } from '../types';

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

    test('POST Register user account with valid credentials', async ({ request }) => {
        const testUser: UserAccount = {
            name: 'baio',
            email: ENV.registerEmail,
            password: ENV.registerPassword,
            title: 'Mr',
            birth_date: '1',
            birth_month: '1',
            birth_year: '1991',
            firstname: 'baioc',
            lastname: 'srajoc',
            company: 'firma',
            address1: 'address 1',
            address2: 'address 2',
            country: 'Canada',
            zipcode: "12345",
            state: 'statiwo',
            city: 'makarena',
            mobile_number: '4234234'
        };

        const response = await request.post('/api/createAccount', {
            form: testUser as Record<string, string>
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(201);
        expect(body.message).toBe('User created!');

        // CLEANUP
        const deleteResponse = await request.delete('/api/deleteAccount', {
            form: {
                email: ENV.registerEmail,
                password: ENV.registerPassword,
            }
        });

        const deleteBody = await deleteResponse.json();
        expect(deleteBody.responseCode).toBe(200);
    });

    /* test.only('CLEANUP - delete test user', async ({ request }) => {
      const deleteResponse = await request.delete('/api/deleteAccount', {
          form: {
              email: 'baio@test.com',
              password: 'testpassword12#'
          }
      });

      const deleteBody = await deleteResponse.json();
      console.log(deleteBody);
  }); */

});