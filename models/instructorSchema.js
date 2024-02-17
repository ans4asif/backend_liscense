const mongoose = require('mongoose');

const INSTRUCTORS = new mongoose.Schema(
    {
        instructor_name: {
            type: String,
            required: true,
        },
        driving_lisence: {
            type: String,
            required: true,
        },
        expiry_date: {
            type: String,
            required: true,
        },
        instructor: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
);

module.exports = mongoose.model('instructors', INSTRUCTORS);
