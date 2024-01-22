const BAD_REQUEST = {
  code: 400,
  title: "Bad Request"
}

const UNAUTHORIZED = {
  code: 401,
  title: "Unauthorized"
}

const FORBIDDEN = {
  code: 403,
  title: "Forbidden"
}

const NOT_FOUND = {
  code: 404,
  title: "Not Found"
}

const PAYLOAD_TOO_LARGE = {
  code: 413,
  title: "Payload Too Large"
}

const INTERNAL_SERVER_ERROR = {
  code: 500,
  title: "Internal Server Error"
}

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  PAYLOAD_TOO_LARGE,
  INTERNAL_SERVER_ERROR
};
