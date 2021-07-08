class CustomErrorHandler extends Error{
    constructor(statusCode, msg) {
        super();
        this.statusCode = statusCode;
        this.msg = msg
    }

    static alreadyExist = (message) => {
        return new CustomErrorHandler(409, message);
    }

    static wrongCredentials = (message="username or password is wrong") => {
        return new CustomErrorHandler(409, message);
    }

    static unAuthorized = (message="unAuthorized") => {
        return new CustomErrorHandler(401, message);
    }
    static notFound = (message="user not found") => {
        return new CustomErrorHandler(401, message);
    }
}

module.exports = CustomErrorHandler;