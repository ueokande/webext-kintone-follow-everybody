import messages from '../shared/messages';
import MessageListener from './MessageListener';

let listener = new MessageListener();
listener.onMessage((msg) => {
  switch(msg.type) {
  case messages.GET_ALL_USERS:
    return Promise.resolve('invoked GET_ALL_USERS')

  case messages.FOLLOW_USERS:
    return Promise.resolve('invoked FOLLOW_USERS')
  }
  return Promise.resolve(123);
})
