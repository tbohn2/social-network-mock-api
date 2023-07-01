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
            match: /^\S+@\S+\.\S+$/,
        },
        thoughts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought',
        },],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },]
    },
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;