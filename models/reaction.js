const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
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
            get: (date) => {
                return new Date(date).toLocaleString();
            }
        },
    },
    { toJSON: { getters: true } }
);

module.exports = reactionSchema;