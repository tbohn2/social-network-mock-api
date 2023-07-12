const router = require('express').Router();

// Imports all controller methods from thoughtController
const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addNewReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

// Root to get all thoughts and create new thought
router.route('/').get(getThoughts).post(createThought)

// Param with thought id to get, update, or delete specific thought
router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought)

// Param with thought id under reactions to create new reaction
router.route('/:thoughtId/reactions').put(addNewReaction)

// Param with thought id and reaction id to delete specific reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;