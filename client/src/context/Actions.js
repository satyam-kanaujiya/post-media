export const fetchStart = (user) => ({
    type:"LOGIN START"
} );

export const fetchSuccess = (user) => ({
    type:"LOGIN SUCCESS",
    payload:user
} );

export const fetchFailure = (user) => ({
    type:"LOGIN FAIL",
    payload:error
} );