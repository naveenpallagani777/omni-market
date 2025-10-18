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

    apiFeatures: class {
        constructor(query, queryString, totalDocs) {
            this.query = query;
            this.queryString = queryString;
            this.totalDocs = totalDocs;
        }

        filter() {
            const queryObj = { ...this.queryString };
            const excludedFields = ["page", "sort", "limit", "fields"];
            excludedFields.forEach((el) => delete queryObj[el]);

            let queryStr = JSON.stringify(queryObj);
            queryStr = queryStr.replace(
                /\b(gt|gte|lt|lte|ne|in|nin)\b/g,
                (match) => `$${match}`
            );

            this.query = this.query.find(JSON.parse(queryStr));
            return this;
        }

        sort() {
            if (this.queryString.sort) {
                const sortBy = this.queryString.sort.split(",").join(" ");
                this.query = this.query.sort(sortBy);
            } else {
                this.query = this.query.sort("-createdAt");
            }
            return this;
        }

        limitFields() {
            if (this.queryString.fields) {
                const fields = this.queryString.fields.split(",").join(" ");
                this.query = this.query.select(fields);
            } else {
                this.query = this.query.select("-__v");
            }
            return this;
        }

        paginate() {
            const page = parseInt(this.queryString.page, 10) || 1;
            const limit = parseInt(this.queryString.limit, 10) || 10;
            const skip = (page - 1) * limit;

            this.query = this.query.skip(skip).limit(limit);

            if (this.totalDocs !== undefined) {
                const totalPages = Math.ceil(this.totalDocs / limit);

                // ✅ Only throw if there are documents and page exceeds total pages
                if (totalPages > 0 && page > totalPages) {
                    throw new Error("This page does not exist");
                }
            }

            return this;
        }
    },
};
