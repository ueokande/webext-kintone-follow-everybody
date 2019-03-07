import CheckpointRepository from '../../src/background/CheckpointRepository';

describe("shared/versions/storage", () => {
  beforeEach(() => {
    return browser.storage.local.clear();
  });

  describe('#getCheckpoint', () => {
    it('returns undefined at first', async() => {
      let sut = new CheckpointRepository();
      expect(await sut.getCheckpoint('example.cybozu.com')).to.be.undefined;
    })

    it('returns last users', async() => {
      await browser.storage.local.set({
        checkpoint: {
          'example1.cybozu.com': { lastUserId: 10, updatedAt: new Date() },
          'example2.cybozu.com': { lastUserId: 20, updatedAt: new Date() },
        },
      });

      let sut = new CheckpointRepository();
      let uid = await sut.getCheckpoint();
      expect((await sut.getCheckpoint('example1.cybozu.com')).lastUserId).to.equal(10);
      expect((await sut.getCheckpoint('example2.cybozu.com')).lastUserId).to.equal(20);
      expect(await sut.getCheckpoint('example3.cybozu.com')).to.be.undefined;
    });
  })

  describe('#setCheckpoint', async() => {
    it('returns undefined at first', async() => {
      let sut = new CheckpointRepository();
      await sut.setCheckpoint('example.cybozu.com', 10);
      expect((await sut.getCheckpoint('example.cybozu.com')).lastUserId).to.equal(10);
    })

    it('returns undefined at first', async() => {
      await browser.storage.local.set({
        checkpoint: {
          'example1.cybozu.com': { lastUserId: 10, updatedAt: new Date() },
          'example2.cybozu.com': { lastUserId: 20, updatedAt: new Date() },
        },
      });

      let sut = new CheckpointRepository();
      await sut.setCheckpoint('example3.cybozu.com', 30);

      expect((await sut.getCheckpoint('example1.cybozu.com')).lastUserId).to.equal(10);
      expect((await sut.getCheckpoint('example2.cybozu.com')).lastUserId).to.equal(20);
      expect((await sut.getCheckpoint('example3.cybozu.com')).lastUserId).to.equal(30);
    })
  })
});
