import messages from '../shared/messages';

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({
    url: [
      'https://*.cybozu.com/k/*',
      'https://*.cybozu-dev.com/k/*'
    ]
  }).then((tabs) => {
    for (let tab of tabs) {
      console.log('sending to', tab.id);
      browser.tabs.sendMessage(tab.id, {
        type: messages.GET_ALL_USERS,
      }).then((ret) => {
        console.log('returned', ret);
      }).catch(console.error);
    }
  });
})
