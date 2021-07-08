const {DEBUG_MODE} = require('../config')
const {ValidationError} = require('joi');
const CustomErrorHandler = require('../services/customErrorHandler');
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let data = {
        message: "Internal server error",
        ...(DEBUG_MODE === 'true' && {originalError: err.message})
    }

    if(err instanceof ValidationError) {
        statusCode = 422;
        data = {
            status: statusCode,
            message: err.message
        }
    }

    if(err instanceof CustomErrorHandler) {
        statusCode = 409;
        data = {
            status: err.statusCode,
            message: err.msg
        }
    }

    return res.status(statusCode).json(data)
}

module.exports = {errorHandler};