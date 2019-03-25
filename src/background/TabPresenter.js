export default class TabPresenter {
  getKintoneTabs() {
    return browser.tabs.query({
      url: [
        'https://*.cybozu.com/k/*',
        'https://*.s.cybozu.com/k/*',
        'https://*.cybozu-dev.com/k/*',
        'https://*.s.cybozu-dev.com/k/*',
      ]
    });
  }
}
