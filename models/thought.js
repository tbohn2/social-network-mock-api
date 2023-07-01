const { Schema, model } = require('mongoose');
const reactionsSchema = require('./reaction');

// Schema to create User model
const thoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: true,


        },
        createdAt: {
        },
        username: [userSchema],
        reactions: [reactionSchema]
    },
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;