import messages from '../shared/messages';
import uuidv4 from 'uuid/v4';

export default class PageClient {
  sendMessage(message) {
    return new Promise((resolve, reject) => {
      let id = uuidv4();
      let handler = (e) => {
        if (e.source !== window) {
          return;
        }
        let response = null;
        try {
          response = JSON.parse(e.data);
        } catch (_) {
          // ignore unexpected message
          return;
        }
        if (response.type === messages.MESSAGE_REQUEST || response.id !== id) {
          return;
        }
        switch (response.type) {
        case messages.MESSAGE_RESPONSE:
          window.removeEventListener('message', handler);
          resolve(response.body);
          break;
        case messages.MESSAGE_REJECTED:
          window.removeEventListener('message', handler);
          reject(new Error(response.message));
          break;
        }
      };
      window.addEventListener('message', handler);
      window.postMessage(messages.createRequest(id, message));
    });
  }
}
