import messages from '../shared/messages';

export default class ContentClient {
  getAllUsers(tabId) {
    return browser.tabs.sendMessage(tabId, {
      type: messages.GET_ALL_USERS,
    });
  }

  followUsers(id) {
    return browser.tabs.sendMessage(tabId, {
      type: messages.FOLLOW_USER,
      id,
    });
  }
}
