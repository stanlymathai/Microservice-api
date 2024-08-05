const { isValidObjectId } = require('mongoose');

const userService = require('../services/user.service');
const responseHandler = require('../handlers/response.handler');
const ERROR_MESSAGES = require('../constants/errorMessage.constants');

// Controller to handle creating a user
async function createUser(req, res) {
  try {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      let userData = {};
      if (body) {
        try {
          userData = JSON.parse(body);
        } catch (parseError) {
          return responseHandler.sendBadRequest(res, ERROR_MESSAGES.INVALID_USER_DATA);
        }
      }

      if (!userData || Object.keys(userData).length === 0) {
        return responseHandler.sendBadRequest(res, ERROR_MESSAGES.MISSING_USER_DATA);
      }

      try {
        const newUser = await userService.createUser(userData);
        responseHandler.sendSuccessResponse(res, newUser);
      } catch (error) {
        responseHandler.sendInternalServerError(res, ERROR_MESSAGES.USER_CREATION_FAILED);
      }
    });
  } catch (error) {
    responseHandler.sendInternalServerError(res, ERROR_MESSAGES.USER_CREATION_FAILED);
  }
}

// Controller to handle fetching a user by ID
async function getUserById(_, res, userId) {
  try {
    if (!userId || !isValidObjectId(userId)) {
      responseHandler.sendBadRequest(res, ERROR_MESSAGES.INVALID_USER_DATA);
      return;
    }
    const user = await userService.getUserById(userId);
    if (user) {
      responseHandler.sendSuccessResponse(res, user);
    } else {
      responseHandler.sendBadRequest(res, ERROR_MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    responseHandler.sendInternalServerError(res, ERROR_MESSAGES.USER_NOT_FOUND);
  }
}

module.exports = {
  createUser,
  getUserById,
};
