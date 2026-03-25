export const ENDPOINTS = {
    AE: {
        PRODUCTS_LIST: '/api/productsList',
        BRANDS_LIST: '/api/brandsList',
        SEARCH_PRODUCT: '/api/searchProduct'
    },
    RB: {
        // tu później dodasz endpointy dla Restful-Booker
        CREATE_TOKEN: '/auth',
        BOOKING: '/booking',
        BOOKING_ID: '/booking/:id',
        PING: '/ping'
    }
};

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}