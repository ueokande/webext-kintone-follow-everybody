import messages from '../shared/messages';

export default class MessageListener {
  constructor() {
    this.listener = () => {};
    window.addEventListener("message", this.onWindowMessage.bind(this));
  }

  onMessage(listener) {
    this.listener = listener;
  }

  onWindowMessage(e) {
    let msg;
    try {
      msg = JSON.parse(e.data)
    } catch (e) {
      return;
    }

    if (msg.type !== messages.PAGE_MESSAGE_REQUEST) {
      return;
    }

    let resp = this.listener(msg.body);
    if (resp instanceof Promise) {
      resp.then((body) => {
        e.source.postMessage(JSON.stringify({
          type: messages.PAGE_MESSAGE_RESPONSE,
          id: msg.id,
          body,
        }), e.origin);
      });
      return;
    }
    e.source.postMessage(JSON.stringify({
      type: messages.PAGE_MESSAGE_RESPONSE,
      id: msg.id,
      body: resp,
    }));
  }
}
