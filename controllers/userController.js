const { User, Thought } = require('../models');

module.exports = {
    // Gets all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params._id })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'User does not exist' })
            }

            res.json({
                user
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
}
