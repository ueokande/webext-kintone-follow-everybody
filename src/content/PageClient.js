import messages from '../shared/messages';

export default class PageClient {
  getToken() {
    return new Promise((resolve, reject) => {
      let listener = (e) => {
        let msg;
        try {
          msg = JSON.parse(e.data)
        } catch (e) {
          // ignore unexpected message
          return;
        }

        switch (msg.type) {
          case messages.RESPONSE_CSRF_TOKEN:
            window.removeEventListener('message', listener);
            resolve(msg.token);
        }
      };
      window.addEventListener('message', listener, false);
      window.postMessage(JSON.stringify({
        type: messages.REQUEST_CSRF_TOKEN
      }), window.origin);
    });
  }

  getSession() {
    throw new Error("TODO: implement");
  }
}
