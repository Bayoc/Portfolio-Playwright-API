import { test, expect, RB_URL } from '../../data/restful-booker/fixtures';
import Ajv from 'ajv';
import { createBookingSchema, bookingIdsSchema, bookingSchema } from '../../data/restful-booker/schemas';
import { DEFAULT_BOOKING_DATA } from '../../data/restful-booker/booking-data';
import { BookingClient, authHeaders} from '../../helpers/restful-booker/api-helpers';

const ajv = new Ajv();

test.describe('Restful Booker - Schema Validation', () => {
    const validateBooking = ajv.compile(bookingSchema);

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
            data: DEFAULT_BOOKING_DATA
        });

        const body = await response.json();
        const validate = ajv.compile(createBookingSchema);
        const valid = validate(body);
        expect(valid, JSON.stringify(validate.errors)).toBe(true);
    });

    test('PUT UpdateBooking - response matches schema', async ({ request, rbToken }) => {
        const bookingClient = new BookingClient(request);
        const bookingId = await bookingClient.createBooking();

        const updatedData = {
            ...DEFAULT_BOOKING_DATA,
            lastname: 'Updated'
        };

        const response = await request.put(`${RB_URL}/booking/${bookingId}`, {

            headers: authHeaders(rbToken),
            data: updatedData

        });

        const body = await response.json();
        const valid = validateBooking(body);
        expect(valid, JSON.stringify(validateBooking.errors)).toBe(true);
        expect(body.lastname).toBe('Updated');
    });

});