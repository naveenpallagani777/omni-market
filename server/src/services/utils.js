module.exports = {
    createError: (message, statusCode) => {
        const error = new Error(message);
        error.statusCode = statusCode;
        return error;
    },

    catchAsync: (fn) => async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            if (!err.statusCode) {
                err = module.exports.createError("Internal Server Error", 500);
            }
            next(err);
        }
    },
};
