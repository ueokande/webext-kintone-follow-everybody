import CheckpointRepository from './CheckpointRepository';
import NotificationPresenter from './NotificationPresenter';
import TabPresenter from './TabPresenter';
import ContentClient from './ContentClient';

const UPDATE_INTERVAL = 600000;  // 10min.

export default class FollowUseCase {
  constructor({
    checkpointRepository = new CheckpointRepository(),
    notificationPresenter = new NotificationPresenter(),
    tabPresenter = new TabPresenter(),
    contentClient = new ContentClient(),
  }) {
    this.checkpointRepository = checkpointRepository;
    this.notificationPresenter = notificationPresenter;
    this.tabPresenter = tabPresenter;
    this.contentClient = contentClient;
  }

  async update(tab) {
    let fqdn = this.getFQDN(tab.url);
    let lastUserId = 0;
    let checkpoint = await this.checkpointRepository.getCheckpoint(fqdn);
    if (checkpoint) {
      if (checkpoint && Date.now() - checkpoint.updatedAt < UPDATE_INTERVAL) {
        return;
      }
      lastUserId = checkpoint.lastUserId
    }

    let users = await this.contentClient.getAllUsers(tab.id);
    let index = users.findIndex(u => Number(u.id) > Number(lastUserId));
    if (index < 0) {
      return;
    }
    users = users.slice(index);
    for (let u of users) {
      try {
        await this.contentClient.followUsers(u.id);
      } catch (e) {
        console.error(`Failed to follow user u.id`, e);
        return;
      }
    }
    await this.checkpointRepository.setCheckpoint(fqdn, users[users.length - 1].id);
    await this.notificationPresenter.notifyUpdated(fqdn, users.length);
  }

  getFQDN(url) {
    let u = new URL(url);
    let words = u.hostname.split(".")
    if (words.length > 0 && words[1] == 's') {
      words.splice(1, 1);
      return words.join(".")
    }
    return u.hostname;
  }
}
