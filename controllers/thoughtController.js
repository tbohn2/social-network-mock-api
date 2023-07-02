const { User, Thought } = require('../models');

module.exports = {
    // Gets all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'Thought does not exist' })
            }

            res.json({ thought });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async createthought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: thought.id },
                { runValidators: true, new: true }
            )
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.id });

            if (!thought) {
                return res.status(404).json({ message: 'Thought does not exist' });
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addNewReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}
