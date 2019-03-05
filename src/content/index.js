import page from './page';
import PageClient from './PageClient';
import messages from '../shared/messages';

page.load();

let pageClient = new PageClient();

browser.runtime.onMessage.addListener((msg) => {
  switch(msg.type) {
  case messages.GET_ALL_USERS:
  case messages.FOLLOW_USERS:
    return pageClient.sendMessage(msg);
  }
});
