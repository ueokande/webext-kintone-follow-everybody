import messages from '../shared/messages';
import MessageListener from './MessageListener';
import Controller from './Controller';

let controller = new Controller();
let listener = new MessageListener();
listener.onMessage((msg) => {
  switch(msg.type) {
  case messages.GET_ALL_USERS:
    return controller.get1000Users();
  case messages.FOLLOW_USER:
    return controller.follow(msg.id);
  }
})
