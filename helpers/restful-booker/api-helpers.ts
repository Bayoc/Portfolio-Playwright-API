import { APIRequestContext } from '@playwright/test';
import { RB_URL } from '../../data/restful-booker/fixtures';
import { ENDPOINTS } from '../../data/restful-booker/endpoints';
import { DEFAULT_BOOKING_DATA } from '../../data/restful-booker/booking.data';

export const authHeaders = (token: string) => ({
    'Cookie': `token=${token}`,
    'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
});

export class BookingClient {
    constructor(private request: APIRequestContext) { }

    async createBooking(data = DEFAULT_BOOKING_DATA) {
        const response = await this.request.post(`${RB_URL}${ENDPOINTS.RB.BOOKING}`, { data });
        const body = await response.json();
        return body.bookingid as number;
    }
}