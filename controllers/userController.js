// Imports models
const { User } = require('../models');

module.exports = {
    // Gets all users
    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v');
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Gets one user by its id
    async getOneUser(req, res) {
        try {
            // Finds user by its id excluding -__v value
            const user = await User.findOne({ _id: req.params._id }).select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'User does not exist' })
            }

            res.json({ user });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Creates new user from json body on request
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Updates user by its id
    async updateUser(req, res) {
        try {
            // Finds user by id and sets data as found in the req.body with validation
            const user = await User.findOneAndUpdate(
                { _id: req.params._id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delets user by id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params._id });

            if (!user) {
                return res.status(404).json({ message: 'User does not exist' });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Adds new friend to user
    async addNewFriend(req, res) {
        try {
            // Finds user by id and adds friend's id to friends key on user
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Deletes friend
    async deleteFriend(req, res) {
        try {
            // Finds user by id and pulls friend id from friends key on user
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}
