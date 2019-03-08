import messages from '../shared/messages';

export default class ContentClient {
  getAllUsers(tabId) {
    return browser.tabs.sendMessage(tabId, {
      type: messages.GET_ALL_USERS,
    });
  }

  getLoginUser(tabId) {
    return browser.tabs.sendMessage(tabId, {
      type: messages.GET_LOGIN_USER,
    });
  }

  followUsers(tabId, id) {
    return browser.tabs.sendMessage(tabId, {
      type: messages.FOLLOW_USER,
      id,
    });
  }
}
