const router = require('express').Router();

// Imports all controller methods from userController
const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend
} = require('../../controllers/userController')

// Root to get all users and create new user
router.route('/').get(getUsers).post(createUser)

// Param with user id to get, update, or delete specific user
router.route('/:_id').get(getOneUser).put(updateUser).delete(deleteUser)

// Param with user id and friend id to add or delete friend
router.route('/:userId/friends/:friendId').put(addNewFriend).delete(deleteFriend)

module.exports = router;