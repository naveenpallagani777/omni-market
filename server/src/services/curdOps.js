const { createError, apiFeatures } = require("./utils");

module.exports = {
    create: async (Model, data) => {
        try {
            const doc = new Model(data);
            const savedDoc = await doc.save();
            if (!savedDoc) throw createError(`Failed to create ${Model.modelName}`, 400);
            return { ...savedDoc.toObject(), id: savedDoc._id };
        } catch (err) {
            throw createError(err.message, 400);
        }
    },

    readAll: async (Model, filter = {}, queryString = {}, projection = null, options = {}) => {
        try {
            let baseQuery = Model.find(filter, projection, options);
            const totalDocs = await Model.countDocuments(filter);

            const features = new apiFeatures(baseQuery, queryString, totalDocs)
                .filter()
                .sort()
                .limitFields()
                .paginate();

            const docs = await features.query;
            return docs.map(doc => ({ ...doc.toObject(), id: doc._id }));
        } catch (err) {
            throw createError(err.message, 400);
        }
    },

    readById: async (Model, id, projection = null, options = {}) => {
        try {
            const doc = await Model.findById(id);
            if (!doc) throw createError(`${Model.modelName} not found`, 400);
            return { ...doc.toObject(), id: doc._id };
        } catch (err) {
            throw createError(err.message, 400);
        }
    },

    updateById: async (Model, id, updateData, options = {}) => {
        try {
            const updatedDoc = await Model.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true, ...options }
            );
            if (!updatedDoc) throw createError(`${Model.modelName} not found`, 400);
            return { ...updatedDoc.toObject(), id: updatedDoc._id };
        } catch (err) {
            throw createError(err.message, 400);
        }
    },


    deleteById: async (Model, id) => {
        try {
            const doc = await Model.findById(id);
            if (!doc) throw createError(`${Model.modelName} not found`, 400);
            const deletedDoc = await Model.findByIdAndDelete(id);
            if (!deletedDoc) throw createError(`Failed to delete ${Model.modelName}`, 400);
            return { ...doc.toObject(), id: doc._id };
        } catch (err) {
            throw createError(err.message, 400);
        }
    },

    read: async (Model, filter = {}, projection = null, options = {}) => {
        try {
            const doc = await Model.findOne(filter);
            if (!doc) throw createError(`${Model.modelName} not found`, 400);
            return { ...doc.toObject(), id: doc._id };
        } catch (err) {
            throw createError(err.message, 400);
        }
    },

    update: async (Model, filter = {}, updateData, options = {}) => {
        try {
            const doc = await Model.findOne(filter);
            if (!doc) throw createError(`${Model.modelName} not found`, 400);
            const updatedDoc = await Model.findOneAndUpdate(filter, updateData, options);
            if (!updatedDoc) throw createError(`Failed to update ${Model.modelName}`, 400);
            return { ...updatedDoc.toObject(), id: updatedDoc._id };
        } catch (err) {
            throw createError(err.message, 400);
        }
    },

    delete: async (Model, filter = {}) => {
        try {
            const doc = await Model.findOne(filter);
            if (!doc) throw createError(`${Model.modelName} not found`, 400);
            return { ...doc.toObject(), id: doc._id };
        } catch (err) {
            throw createError(err.message, 400);
        }
    },

    updateMany: async (Model, filter = {}, updateData, options = {}) => {
        try {
            const result = await Model.updateMany(filter, updateData, options);
            if (result.nModified === 0) throw createError(`No ${Model.modelName} documents were updated`, 400);
            return { modifiedCount: result.nModified };
        } catch (err) {
            throw createError(err.message, 400);
        }
    },

    deleteMany: async (Model, filter = {}) => {
        try {
            const result = await Model.deleteMany(filter);
            if (result.deletedCount === 0) throw createError(`No ${Model.modelName} documents were deleted`, 400);
            return { deletedCount: result.deletedCount };
        } catch (err) {
            throw createError(err.message, 400);
        }
    }
};