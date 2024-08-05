const responseHandler = require('./response.handler');

function globalErrorHandler(err, req, res) {
  console.error("Error stack", err.stack);
  responseHandler.sendInternalServerError(res, 'Something went wrong!');
}

module.exports = globalErrorHandler;
