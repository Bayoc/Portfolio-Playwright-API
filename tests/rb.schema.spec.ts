import { test, expect, RB_URL } from './fixtures';
import Ajv from 'ajv';
import { createBookingSchema, bookingIdsSchema, bookingSchema } from '../api/schemas';


const ajv = new Ajv();

test.describe('Restful Booker - Schema Validation', () => {

    test('GET Booking - response matches schema', async ({ request }) => {
        const idsResponse = await request.get(`${RB_URL}/booking`);
        const ids = await idsResponse.json();
        const firstId = ids[0].bookingid;

        const response = await request.get(`${RB_URL}/booking/${firstId}`);
        const body = await response.json();

        const validate = ajv.compile(bookingSchema);

        const valid = validate(body);

        expect(valid, JSON.stringify(validate.errors)).toBe(true);
    });


    test('GET BookingIds - response matches schema', async ({ request }) => {
        const response = await request.get(`${RB_URL}/booking`);
        const body = await response.json();

        const validate = ajv.compile(bookingIdsSchema);
        const valid = validate(body);
        expect(valid, JSON.stringify(validate.errors)).toBe(true);
    });

    test('POST CreateBooking - response matches schema', async ({ request }) => {

        const response = await request.post(`${RB_URL}/booking`, {
            data: {
                firstname: 'Baio',
                lastname: 'TestLastName',
                totalprice: 999,
                depositpaid: true,
                bookingdates: {
                    checkin: '2026-02-01',
                    checkout: '2026-02-12'
                },
                additionalneeds: 'none'
            }
        });

        const body = await response.json();
        const validate = ajv.compile(createBookingSchema);
        const valid = validate(body);
        expect(valid, JSON.stringify(validate.errors)).toBe(true);
    });
});