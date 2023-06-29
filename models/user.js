const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        usrename: {
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
        thoughts: {},
        friends: {}
    },
);

const User = model('user', userSchema);

module.exports = User;