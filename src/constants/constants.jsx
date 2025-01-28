export const statusConst = {
    IDLE: 'IDLE',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};
export const typeConst = {
    UNDEFINED: 'undefined',
};

export const appTokenName = 'token';

export const responseCodeConst = {
    SUCCESS: 200,
    CREATED_SUCCESSFULLY: 201,
    INTERNAL_ERROR: 500,
    NOT_FOUND: 404,
    CONTENT_NOT_FOUND: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    ALREADY_EXIST: 409,
    FORBIDDEN: 403,
};

export const errorConst = {
    INTERNAL_ERROR: 'Internal Server Error',
    INCORRECT_EMAIL: 'Kindly signup if you are new to this website',
    INCORRECT_PASSWORD: 'Password not correct',
    INCORRECT_REFCODE: 'User not exist with this Reference Code!',
    EMAIL_ALREADY_EXIST: 'User already exist with this email!',
    EMAIL_NOT_EXIST: 'User not exist with this email',
    OTP_INCORRECT: 'Invalid OTP',
};

export const defaultPageCount = { limit: 5, page: 1 };