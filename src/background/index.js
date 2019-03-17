import FollowUseCase from './FollowUseCase';

// 10 minute
const UPDATE_INTERVAL = 600000;

let usecase = new FollowUseCase();

try {
  usecase.updateAll();
} catch (e) {
  console.error(e);
}
setInterval(() => {
  try {
    usecase.updateAll();
  } catch (e) {
    console.error(e);
  }
}, UPDATE_INTERVAL);

browser.runtime.onMessage.addListener((message, sender) => {
  try {
    usecase.update(sender.tab);
  } catch (e) {
    console.error(e);
  }
});

