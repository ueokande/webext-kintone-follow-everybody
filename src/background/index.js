import FollowUseCase from './FollowUseCase';

// 10 minute
const UPDATE_INTERVAL = 600000;

let usecase = new FollowUseCase();

setInterval(() => {
  try {
    usecase.updateAll();
  } catch (e) {
    console.error(e);
  }
}, UPDATE_INTERVAL);
