const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser)

router.route('/:_id').get(getOneUser).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').put(addNewFriend).delete(deleteFriend)

module.exports = router;