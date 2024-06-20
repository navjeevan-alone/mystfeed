const BASE_URL = "http://localhost:3000/";
// TODO: Replace hardcoded route paths with these constants
// Define API routes as constants
const AUTH_BASE = `${BASE_URL}/auth`;

// Messages Routes
const MESSAGE_BASE = `${BASE_URL}/message`;
const MESSAGE_DELETE = `${MESSAGE_BASE}/delete`;
const MESSAGE_GET_ALL = `${MESSAGE_BASE}/get-all`;
const MESSAGE_REPLY = `${MESSAGE_BASE}/reply`;
const MESSAGE_SEND = `${MESSAGE_BASE}/send`;
// User Routes 
const USER_BASE = `${BASE_URL}/user`;
const USER_RESEND_VERIFY_CODE = `${USER_BASE}/resend-verifycode`;
const USER_SIGN_UP = `${USER_BASE}/sign-up`;
const USER_TOGGLE_ALLOW_MESSAGE = `${USER_BASE}/toggle-allow-message`;
const USER_VALIDATE_USERNAME = `${USER_BASE}/validate-username`;
const USER_VERIFY_CODE = `${USER_BASE}/verify-code`;

export {
  BASE_URL,
  AUTH_BASE,
  MESSAGE_DELETE,
  MESSAGE_GET_ALL,
  MESSAGE_REPLY,
  MESSAGE_SEND,
  USER_RESEND_VERIFY_CODE,
  USER_SIGN_UP,
  USER_TOGGLE_ALLOW_MESSAGE,
  USER_VALIDATE_USERNAME,
  USER_VERIFY_CODE,
};