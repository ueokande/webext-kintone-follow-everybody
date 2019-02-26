import messages from '../shared/messages';

window.addEventListener("message", (e) => {
  let msg;
  try {
    msg = JSON.parse(e.data)
  } catch (e) {
    // ignore unexpected message
    return;
  }

  switch (msg.type) {
  case messages.REQUEST_CSRF_TOKEN:
    e.source.postMessage(JSON.stringify({
      type: messages.RESPONSE_CSRF_TOKEN,
      token: window.kintone.getRequestToken(),
    }), e.origin);
  }
}, false);
