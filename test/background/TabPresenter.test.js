import TabPresenter from '../../src/background/TabPresenter';

describe("shared/versions/storage", () => {
  beforeEach(async() => {
    await browser.tabs.create({ url: "https://example.cybozu.com/g/schedule" });
    await browser.tabs.create({ url: "https://example.cybozu.com/k/123/" });
    await browser.tabs.create({ url: "https://example.cybozu-dev.com/k/123/" });
  });

  describe('#getKintoneTabs', async() => {
    let tabPresenter = new TabPresenter();
    let tabs = await tabPresenter.getKintoneTabs();
    expect(tabs).to.have.lengthOf(3);
  });
});
