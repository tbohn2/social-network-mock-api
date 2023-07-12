// Imports Schema and model from mongoose
const { Schema, model } = require('mongoose');
// Imports thought model
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
        // References Thought modal for array of thoughts from user
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },],
        // References User modal for array of user's friends
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },]
    },
);

// Virtual that returns number of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

//Exports User model
module.exports = User;