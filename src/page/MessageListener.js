import messages from '../shared/messages';

export default class MessageListener {
  constructor() {
    this.listener = () => {};
  }

  onMessage(listener) {
    this.listener = listener;
    this.bound = this.handler.bind(this);
    window.addEventListener('message', this.bound);
  }

  stop() {
    window.removeEventListener('message', this.bound);
  }

  handler(e) {
    let request = null;
    try {
      request = JSON.parse(e.data);
    } catch (_) {
      // ignore unexpected message
      return;
    }
    if (request.type !== messages.MESSAGE_REQUEST) {
      return;
    }

    let ret = null;
    try {
      ret = this.listener(request.body);
    } catch (err) {
      e.source.postMessage(messages.createRejected(request.id, err.message));
      return;
    }
    if (!(ret instanceof Promise)) {
      e.source.postMessage(messages.createResponse(request.id, undefined));
      return;
    }
    ret.then((value) => {
      e.source.postMessage(messages.createResponse(request.id, value));
    }).catch((err) => {
      e.source.postMessage(messages.createRejected(request.id, err.message));
    });
  }
}
