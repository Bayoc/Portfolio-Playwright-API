export const ENDPOINTS = {
    AE: {
        PRODUCTS_LIST: '/api/productsList',
        BRANDS_LIST: '/api/brandsList',
        SEARCH_PRODUCT: '/api/searchProduct',
        VERIFY_LOGIN: '/api/verifyLogin',
        CREATE_ACCOUNT: '/api/createAccount',
        DELETE_ACCOUNT: '/api/deleteAccount',
        UPDATE_ACCOUNT: '/api/updateAccount',
        USER_DETAIL_BY_EMAIL: '/api/getUserDetailByEmail'
    },
};

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    OPTIONS = 'OPTIONS'
}