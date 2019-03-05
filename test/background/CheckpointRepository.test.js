import CheckpointRepository from '../../src/background/CheckpointRepository';

describe("shared/versions/storage", () => {
  beforeEach(() => {
    return browser.storage.local.clear();
  });

  describe('#getLastUserId', () => {
    it('returns undefined at first', async() => {
      let sut = new CheckpointRepository();
      expect(await sut.getLastUserId('example.cybozu.com')).to.be.undefined;
    })

    it('returns last users', async() => {
      await browser.storage.local.set({
        checkpoint: {
          'example1.cybozu.com': 10,
          'example2.cybozu.com': 20,
        },
      });

      let sut = new CheckpointRepository();
      let uid = await sut.getLastUserId();
      expect(await sut.getLastUserId('example1.cybozu.com')).to.equal(10);
      expect(await sut.getLastUserId('example2.cybozu.com')).to.equal(20);
      expect(await sut.getLastUserId('example3.cybozu.com')).to.be.undefined;
    });
  })

  describe('#setLastUserId', async() => {
    it('returns undefined at first', async() => {
      let sut = new CheckpointRepository();
      await sut.setLastUserId('example.cybozu.com', 10);
      expect(await sut.getLastUserId('example.cybozu.com')).to.equal(10);
    })

    it('returns undefined at first', async() => {
      await browser.storage.local.set({
        checkpoint: {
          'example1.cybozu.com': 10,
          'example2.cybozu.com': 20,
        },
      });

      let sut = new CheckpointRepository();
      await sut.setLastUserId('example3.cybozu.com', 30);

      expect(await sut.getLastUserId('example1.cybozu.com')).to.equal(10);
      expect(await sut.getLastUserId('example2.cybozu.com')).to.equal(20);
      expect(await sut.getLastUserId('example3.cybozu.com')).to.equal(30);
    })
  })
});
