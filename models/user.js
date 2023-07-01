const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        thoughts: [thoughtSchema],
        friends: [userSchema]
    },
);

const User = model('user', userSchema);

module.exports = User;