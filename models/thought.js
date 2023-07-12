// Imports schema and model from mongoose
const { Schema, model } = require('mongoose');
// Imports reactionSchema
const reactionSchema = require('./reaction');

// Schema to create thought model with keys and their validators
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Formats date to be more user-friendly
            get: (date) => {
                return new Date(date).toLocaleString();
            }
        },
        username: {
            type: String,
            required: true
        },
        // Sets reactions as an array of the reactionSchema
        reactions: [reactionSchema]
    },
    { toJSON: { getters: true } }
);

// Virtal that returns the number of reactions on a thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

// Exports Thought model
module.exports = Thought;