const { Schema, model } = require('mongoose');
const Thought = require('./thought');

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
            match: /^\S+@\S+\.\S+$/,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },]
    },
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;