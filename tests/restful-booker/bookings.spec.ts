import { test, expect, RB_URL } from '../../data/restful-booker/fixtures';
import { ENDPOINTS } from '../../data/restful-booker/endpoints';
import { DEFAULT_BOOKING_DATA } from '../../data/restful-booker/booking-data';
import { BookingClient, authHeaders} from '../../helpers/restful-booker/api-helpers';

test.describe('GET /booking', () => {

    test('GET BookingIDs - returns the ids of all the booking', async ({ request }) => {
        const response = await request.get(`${RB_URL}${ENDPOINTS.RB.BOOKING}`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.length).toBeGreaterThan(0);
        expect(body[0].bookingid).toBeDefined();
    });

    test('GET Booking - should return booking data', async ({ request }) => {

        const idsResponse = await request.get(`${RB_URL}${ENDPOINTS.RB.BOOKING}`);
        const ids = await idsResponse.json();
        const firstId = ids[0].bookingid;

        const response = await request.get(`${RB_URL}${ENDPOINTS.RB.BOOKING}/${firstId}`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        for (const field of ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates']) {
            expect(body).toHaveProperty(field);
        }

    });
});


test.describe('POST /booking', () => {

    let bookingId: number;

    test.afterEach(async ({ request, rbToken }) => {
        await request.delete(`${RB_URL}${ENDPOINTS.RB.BOOKING}/${bookingId}`, {
            headers: authHeaders(rbToken)
        });
    });

    test('POST CreateBooking - should create booking', async ({ request }) => {

        const response = await request.post(`${RB_URL}${ENDPOINTS.RB.BOOKING}`, {
            data: DEFAULT_BOOKING_DATA
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.bookingid).toBeDefined();
        expect(typeof body.bookingid).toBe('number');
        expect(body.booking.firstname).toBe(DEFAULT_BOOKING_DATA.firstname);
        expect(body.booking.lastname).toBe(DEFAULT_BOOKING_DATA.lastname);
        expect(body.booking.totalprice).toBe(DEFAULT_BOOKING_DATA.totalprice);
        bookingId = body.bookingid;
    });
});

test.describe('PUT /booking', () => {
    let bookingId: number = 0;

    test.afterEach(async ({ request, rbToken }) => {
        await request.delete(`${RB_URL}${ENDPOINTS.RB.BOOKING}/${bookingId}`, {
            headers: authHeaders(rbToken)
        });
    });

    test('PUT UpdateBooking - should update booking', async ({ request, rbToken }) => {
        const bookingClient = new BookingClient(request);
        bookingId = await bookingClient.createBooking();

        const updatedData = {
            ...DEFAULT_BOOKING_DATA,
            lastname: 'Updated'
        };

        const response = await request.put(`${RB_URL}${ENDPOINTS.RB.BOOKING}/${bookingId}`, {

            headers: authHeaders(rbToken),
            data: updatedData

        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.lastname).toBe('Updated');
    });
});

test.describe('DELETE /booking', () => {

     test('DELETE booking - booking should be deleted', async ({ request, rbToken }) => {
        const bookingClient = new BookingClient(request);
        const bookingId = await bookingClient.createBooking();

        const response = await request.delete(`${RB_URL}${ENDPOINTS.RB.BOOKING}/${bookingId}`, {
            headers: authHeaders(rbToken),

        });
        expect(response.status()).toBe(201);
        const verifyResponse = await request.get(`${RB_URL}${ENDPOINTS.RB.BOOKING}/${bookingId}`);
        expect(verifyResponse.status()).toBe(404);
    });
});


