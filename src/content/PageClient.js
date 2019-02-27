import messages from '../shared/messages';
import * as uuid from 'uuid';

export default class PageClient {
  sendMessage(body) {
    let id = uuid.v4();

    return new Promise((resolve, reject) => {
      let listener = (e) => {
        let msg;
        try {
          msg = JSON.parse(e.data)
        } catch (e) {
          return;
        }

        if (msg.type !== messages.PAGE_MESSAGE_RESPONSE || msg.id !== id) {
          return;
        }

        window.removeEventListener('message', listener);
        resolve(msg.body);
      };
      window.addEventListener('message', listener, false);
      window.postMessage(JSON.stringify({
        type: messages.PAGE_MESSAGE_REQUEST,
        id,
        body,
      }), window.origin);
    });
  }
}
