const MESSAGE_REQUEST = 'message.request';
const MESSAGE_RESPONSE = 'message.response';
const MESSAGE_REJECTED = 'message.rejected';

const createRequest = (id, body) => {
  return JSON.stringify({
    type: MESSAGE_REQUEST,
    id,
    body,
  });
};

const createResponse = (id, body) => {
  return JSON.stringify({
    type: MESSAGE_RESPONSE,
    id,
    body,
  });
};

const createRejected = (id, message) => {
  return JSON.stringify({
    type: MESSAGE_REJECTED,
    id,
    message,
  });
};

export default {
  createRequest,
  createResponse,
  createRejected,

  MESSAGE_REQUEST,
  MESSAGE_RESPONSE,
  MESSAGE_REJECTED,

  GET_ALL_USERS: 'kintone.friends/get.all.users',
  GET_LOGIN_USER: 'kintone.friends/get.login.user',
  FOLLOW_USER: 'kintone.friends/follow.user',

  TAB_OPENED: 'tab.opened',
};
