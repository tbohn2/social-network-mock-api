// Imports models
const { User, Thought } = require('../models');

// Exports functions for routes
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
    // Gets one thought by its id
    async getOneThought(req, res) {
        try {
            // Finds thought by id excluding -__v value
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
    // Creates a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            // Finds user after thought is created and pushes thought into user's thoughts array
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought } },
                { runValidators: true, new: true }
            )
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Updates thought
    async updateThought(req, res) {
        try {
            // Finds thought by its id
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
    // Deletes thought by its id
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
    // Adds reaction to thought
    async addNewReaction(req, res) {
        try {
            // Finds thought by its id and pushes new reaction to the thought's reactions array
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
    // Deletes reaction by its id
    async deleteReaction(req, res) {
        try {
            // Finds thought by its id and pulls the reaction where reactionId matches
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }

            res.json("Reaction deleted!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

}
