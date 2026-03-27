
export const bookingSchema = {
    type: 'object',
    required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates'],
    properties: {
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        totalprice: { type: 'number' },
        depositpaid: { type: 'boolean' },
        bookingdates: {
            type: 'object',
            required: ['checkin', 'checkout'],
            properties: {
                checkin: { type: 'string' },
                checkout: { type: 'string' }
            }
        },
        additionalneeds: { type: 'string' }
    },
    additionalProperties: false
};

export const bookingIdsSchema = {
    type: 'array',
    items: {
        type: 'object',
        required: ['bookingid'],
        properties: {
            bookingid: { type: 'number' },
        },
        additionalProperties: false
    }
};

export const createBookingSchema = {
    type: 'object',
    required: ['bookingid', 'booking'],
    properties: {
        bookingid: { type: 'number' },
        booking: bookingSchema
    },

    additionalProperties: false
};