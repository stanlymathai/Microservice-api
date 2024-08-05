const HTTP_STATUS = require('../constants/httpStatus.constants.js');

// Function to send a bad request response
function sendBadRequest(res, error) {
  res.writeHead(HTTP_STATUS.BAD_REQUEST, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: false,
    error: error,
  }));
}

// Function to send an internal server error response
function sendInternalServerError(res, error) {
  res.writeHead(HTTP_STATUS.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: false,
    error: error,
  }));
}

// Function to send a success response
function sendSuccessResponse(res, data = []) {
  res.writeHead(HTTP_STATUS.SUCCESS, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: true,
    data: data,
  }));
}

module.exports = {
  sendBadRequest,
  sendSuccessResponse,
  sendInternalServerError,
};
