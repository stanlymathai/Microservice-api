const User = require('../models/user.model.js');
const ERROR_MESSAGES = require('../constants/errorMessage.constants.js');

async function createUser(userData) {
    try {
        const user = new User(userData);
        await user.save();
        return user.toObject(); // Convert to plain object.
    } catch (error) {
        console.error(ERROR_MESSAGES.USER_CREATION_ERROR);
        throw new Error(ERROR_MESSAGES.USER_CREATION_ERROR);
    }
}

async function getUserById(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error(ERROR_MESSAGES.USER_FETCH_ERROR);
        }
        return user.toObject()
    } catch (error) {
        console.error(ERROR_MESSAGES.USER_FETCH_ERROR);
        throw new Error(ERROR_MESSAGES.USER_FETCH_ERROR);
    }
}

module.exports = {
    createUser,
    getUserById
}