import FollowUseCase from '../../src/background/FollowUseCase';

class MockNotificationPresenter {
  constructor() {
    this.notifications = [];
  }

  notifyUpdated(fqdn, count) {
    this.notifications.push({ fqdn, count })
    return Promise.resolve();
  }
}

class MockCheckpointRepository {
  constructor(checkpoints = {}) {
    this.checkpoints = checkpoints;
  }

  getCheckpoint(fqdn) {
    let checkpoint = this.checkpoints[fqdn];
    return Promise.resolve(checkpoint);
  }

  setCheckpoint(fqdn, uid) {
    this.checkpoints[fqdn] = {
      lastUserId: uid,
      updatedAt: new Date(),
    };
    return Promise.resolve()
  }
}

class MockTabPresenter {
  constructor(tabs = [
    { id: 0, url: 'https://example1.cybozu.com/k/' },
    { id: 1, url: 'https://example1.cybozu.com/k/' },
    { id: 2, url: 'https://example2.cybozu.com/k/' },
    { id: 3, url: 'https://example3.cybozu.com/k/' },
  ]) {
    this.tabs = tabs;
  }
  getKintoneTabs() {
    return Promise.resolve(this.tabs);
  }
}

class MockContentClient {
  constructor(users = [
    { id: "0", name: "alice" },
    { id: "1", name: "bob" },
    { id: "2", name: "carol" },
    { id: "3", name: "dan" },
  ], followings = new Set()) {
    this.users = users;
    this.followings = followings;
  }

  getAllUsers(tabId) {
    return Promise.resolve(this.users);
  }

  followUsers(uid) {
    this.followings.add(uid);
    return Promise.resolve();
  }
}

describe('FollowUseCase', () => {
  describe('#update', () => {
    it('follows a user', async() => {
      let checkpointRepository = new MockCheckpointRepository();;
      let sut = new FollowUseCase({
        checkpointRepository: checkpointRepository,
        notificationPresenter: new MockNotificationPresenter(),
        contentClient: new MockContentClient(),
      });
      await sut.update({ id: 0, url: 'https://example.cybozu.com' });

      let checkpoint = checkpointRepository.checkpoints['example.cybozu.com']
      expect(checkpoint.lastUserId).to.equal('3');
    });

    it('does nothing if followed recently', async() => {
      let checkpointRepository = new MockCheckpointRepository(
        { 'example.cybozu.com': { lastUserId: '1', updatedAt: Date.now() } }
      );
      let contentClient = new MockContentClient();
      await checkpointRepository.setCheckpoint('example.cybozu.com', '1');

      let sut = new FollowUseCase({
        checkpointRepository: checkpointRepository,
        notificationPresenter: new MockNotificationPresenter(),
        contentClient: contentClient,
      });
      await sut.update({ id: 0, url: 'https://example.cybozu.com' });

      let checkpoint = checkpointRepository.checkpoints['example.cybozu.com']
      expect(checkpoint.lastUserId).to.equal('1');
      expect(contentClient.followings).to.be.empty;
    })

    it('follow new users after last followed', async() => {
      let checkpointRepository = new MockCheckpointRepository(
        { 'example.cybozu.com': { lastUserId: '1', updatedAt: Date.now() - 1200000 } }
      );
      let contentClient = new MockContentClient();

      let sut = new FollowUseCase({
        checkpointRepository: checkpointRepository,
        notificationPresenter: new MockNotificationPresenter(),
        contentClient: contentClient,
      });
      await sut.update({ id: 0, url: 'https://example.cybozu.com' });

      let checkpoint = checkpointRepository.checkpoints['example.cybozu.com']
      expect(checkpoint.lastUserId).to.equal('3');
      expect(contentClient.followings).to.deep.equal(['2', '3']);
    })
  })
})
