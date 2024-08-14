export const xAuthToken = () => {
    return {
        // 'X-AUTH-TOKEN': 'abdef',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-AUTH-TOKEN',
        // 'Access-Control-Allow-Credentials': true,
    };
};
