import { APIRequestContext } from '@playwright/test';
import { RB_URL } from './fixtures';
import { ENDPOINTS } from '../../data/restful-booker/endpoints';

export const DEFAULT_BOOKING_DATA = {
    firstname: 'Baio',
    lastname: 'Test',
    totalprice: 999,
    depositpaid: true,
    bookingdates: {
        checkin: '2026-02-01',
        checkout: '2026-02-12'
    },
    additionalneeds: 'none'
};

export const authHeaders = (token: string) => ({
    'Cookie': `token=${token}`,
    'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
});

export class BookingClient {
    constructor(private request: APIRequestContext) {}

    async createBooking(data = DEFAULT_BOOKING_DATA) {
        const response = await this.request.post(`${RB_URL}${ENDPOINTS.RB.BOOKING}`, { data });
        const body = await response.json();
        return body.bookingid as number;
    }
}