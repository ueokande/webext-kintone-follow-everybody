import CheckpointRepository from './CheckpointRepository';
import NotificationPresenter from './NotificationPresenter';
import TabPresenter from './TabPresenter';
import ContentClient from './ContentClient';

// 20min.
const UPDATE_INTERVAL = 1200000;

export default class FollowUseCase {
  constructor({
    checkpointRepository = new CheckpointRepository(),
    notificationPresenter = new NotificationPresenter(),
    tabPresenter = new TabPresenter(),
    contentClient = new ContentClient(),
  } = {}) {
    this.checkpointRepository = checkpointRepository;
    this.notificationPresenter = notificationPresenter;
    this.tabPresenter = tabPresenter;
    this.contentClient = contentClient;
  }

  async update(tab) {
    let fqdn = this.getFQDN(tab.url);
    let checkpoint = await this.checkpointRepository.getCheckpoint(fqdn);
    if (checkpoint && Date.now() - checkpoint.updatedAt < UPDATE_INTERVAL) {
      return;
    }

    let users = await this.contentClient.getAllUsers(tab.id);
    let loginUser = await this.contentClient.getLoginUser(tab.id);

    users = users.filter(u => u.id !== loginUser.id);
    if (checkpoint) {
      users = users.filter(u => Number(u.id) > Number(checkpoint.lastUserId));
    }
    if (users.length === 0) {
      return;
    }

    for (let u of users) {
      try {
        await this.contentClient.followUsers(tab.id, u.id);
      } catch (e) {
        console.error(`Failed to follow user ${u.id}`, e);
        return;
      }
    }
    let lastUserId = users[users.length - 1].id;
    await this.checkpointRepository.setCheckpoint(fqdn, lastUserId);
    if (checkpoint) {
      await this.notificationPresenter.notifyFollowed(fqdn, users.length);
    } else {
      await this.notificationPresenter.notifySynced(fqdn);
    }
  }

  async updateAll() {
    let tabs = await this.tabPresenter.getKintoneTabs();
    let finishedFqdns = [];

    for (let tab of tabs) {
      let fqdn = this.getFQDN(tab.url);
      if (finishedFqdns.includes(fqdn)) {
        continue;
      }

      finishedFqdns.push(fqdn);
      try {
        await this.update(tab);
      } catch (e) {
        console.error(`Failed to update following on ${tab.url}:`, e);
      }
    }
  }

  getFQDN(url) {
    let u = new URL(url);
    let words = u.hostname.split('.');
    if (words.length > 0 && words[1] === 's') {
      words.splice(1, 1);
      return words.join('.');
    }
    return u.hostname;
  }
}
