// Imports schema and types from mongoose
const { Schema, Types } = require('mongoose');

// Creates a new Schema for reactions with keys and their validators
const reactionSchema = new Schema(
    {
        reactionId: {
            // Creates unique id for reaction
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Formats the date to be more user-friendly
            get: (date) => {
                return new Date(date).toLocaleString();
            }
        },
    },
    { toJSON: { getters: true } }
);

// Exports reaction schema
module.exports = reactionSchema;