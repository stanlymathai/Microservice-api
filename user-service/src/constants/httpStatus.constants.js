const HTTP_STATUS = {
  // 2xx - Success
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,

  // 4xx - Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,

  // 5xx - Server Errors
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = HTTP_STATUS;
