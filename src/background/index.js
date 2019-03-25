import FollowUseCase from './FollowUseCase';

// 20 minute
const UPDATE_INTERVAL = 1200000;

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

