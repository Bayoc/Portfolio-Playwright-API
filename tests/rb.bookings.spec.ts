import { test, expect, RB_URL } from './fixtures';
import { BookingClient, authHeaders, DEFAULT_BOOKING_DATA } from '../api/rb.booking.client';


test.describe('Restful Booker Api', () => {
    test('GET HealthCheck - should return 201', async ({ request }) => {
        const response = await request.get(`${RB_URL}/ping`)
        expect(response.status()).toBe(201);
    });

    test('POST CreateToken - should return auth token', async ({ request }) => {
        const response = await request.post(`${RB_URL}/auth`, {
            data: {
                username: "admin",
                password: "password123"
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.token).toBeDefined();
    });

    test('GET BookingIds - should return list of bookings', async ({ request }) => {
        const response = await request.get(`${RB_URL}/booking`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.length).toBeGreaterThan(0);
        expect(body[0].bookingid).toBeDefined();
    });

    test('GET Booking - should return booking data', async ({ request }) => {

        const idsResponse = await request.get(`${RB_URL}/booking`);
        const ids = await idsResponse.json();
        const firstId = ids[0].bookingid;

        const response = await request.get(`${RB_URL}/booking/${firstId}`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('firstname');
        expect(body).toHaveProperty('lastname');
        expect(body).toHaveProperty('totalprice');
        expect(body).toHaveProperty('depositpaid');
        expect(body).toHaveProperty('bookingdates');
    });

    test('POST CreateBooking - should create booking', async ({ request }) => {

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
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('bookingid');
        expect(body.booking).toHaveProperty('firstname');
        expect(body.booking).toHaveProperty('lastname');
        expect(body.booking).toHaveProperty('totalprice');
    });

    test('PUT UpdateBooking - should update booking', async ({ request, rbToken }) => {
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

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.lastname).toBe('Updated');
    });

    test('DELETE booking - booking should be deleted', async ({ request, rbToken }) => {
        const bookingClient = new BookingClient(request);
        const bookingId = await bookingClient.createBooking();

        const response = await request.delete(`${RB_URL}/booking/${bookingId}`, {
            headers: authHeaders(rbToken),

        });
        expect(response.status()).toBe(201);
        const verifyResponse = await request.get(`${RB_URL}/booking/${bookingId}`);
        expect(verifyResponse.status()).toBe(404);
    });
});