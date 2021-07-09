const {
    HttpCode,
    HttpMessage
} = require('../constants/HttpConstants')();

const HttpErrors = class extends Error {
    constructor(error, statusCode, errorCode, isOperational = false) {
        super(error);
        Error.captureStackTrace(this, this.constructor);
        this.message = error.message || HttpMessage.INTERNAL_SERVER_ERROR;
        this.details = error.errors || [];
        this.statusCode = statusCode || HttpCode.INTERNAL_SERVER_ERROR;
        this.errorCode = errorCode || 0;
        this.isOperational = isOperational;
    }

    static badRequest(errors, message = HttpMessage.BAD_REQUEST, errorCode = '', statusCode = HttpCode.BAD_REQUEST) {
        return new HttpErrors(
            Object.assign({ message, errors }),
            statusCode,
            errorCode ? errorCode : statusCode,
            true
        );
    }

    static forbidden(
        errors,
        message = HttpMessage.FORBIDDEN,
        errorCode = '',
        statusCode = HttpCode.FORBIDDEN
    ) {
        return new HttpErrors(
            Object.assign({ message, errors }),
            statusCode,
            errorCode ? errorCode : statusCode,
            true
        );
    }

    static notFound(
        errors,
        message = HttpMessage.NOT_FOUND,
        errorCode = '',
        statusCode = HttpCode.NOT_FOUND
    ) {
        return new HttpErrors(
            Object.assign({ message, errors }),
            statusCode,
            errorCode ? errorCode : statusCode,
            true
        );
    }

    static internalServer(
        errors,
        message = HttpMessage.INTERNAL_SERVER_ERROR,
        errorCode = '',
        statusCode = HttpCode.INTERNAL_SERVER_ERROR
    ) {
        return new HttpErrors(
            Object.assign({ message, errors }),
            statusCode,
            errorCode ? errorCode : statusCode,
            true
        );
    }

    static unprocessable(
        errors,
        message = HttpMessage.UNPROCESSABLE_ENTITY,
        errorCode = '',
        statusCode = HttpCode.UNPROCESSABLE_ENTITY,
    ) {
        return new HttpErrors(
            Object.assign({ message, errors }),
            statusCode,
            errorCode ? errorCode : statusCode,
            true
        );
    }

    static serviceUnavailable(
        errors,
        message = HttpMessage.SERVICE_UNAVAILABLE,
        errorCode = '',
        statusCode = HttpCode.SERVICE_UNAVAILABLE,
    ) {
        return new HttpErrors(
            Object.assign({ message, errors }),
            statusCode,
            errorCode ? errorCode : statusCode,
            true
        );
    }

    static duplicateKeyError(
        errors,
        message = HttpMessage.CONFLICT,
        errorCode = '',
        statusCode = HttpCode.CONFLICT,
    ) {
        return new HttpErrors(
            Object.assign({ message, errors }),
            statusCode,
            errorCode ? errorCode : statusCode,
            true
        );
    }

    static businessError(
        errors,
        message = HttpMessage.UNPROCESSABLE_ENTITY,
        errorCode = '',
        statusCode = HttpCode.UNPROCESSABLE_ENTITY,
    ) {
        return new HttpErrors(
            Object.assign({ message, errors }),
            statusCode,
            errorCode ? errorCode : statusCode,
            true
        );
    }


};

module.exports = HttpErrors;
