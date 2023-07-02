const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addNewReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought)

router.route('/:_id').get(getOneThought).put(updateThought).delete(deleteThought)

router.route('/:ThoughtId/reactions').put(addNewReaction)

router.route('/:ThoughtId/reactions/:reactionId').put(addNewReaction).delete(deleteReaction)