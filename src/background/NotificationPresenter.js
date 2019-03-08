const NOTIFICATION_ID = 'kintone-friends';

export default class NotificationPresenter {
  notifySynced(fqdn) {
    return browser.notifications.create(NOTIFICATION_ID, {
      type: 'basic',
      iconUrl: browser.extension.getURL('resources/icon_128x128.png'),
      title: fqdn,
      message: `全ユーザーをフォローしました`,
    });
  }

  notifyFollowed(fqdn, count) {
    return browser.notifications.create(NOTIFICATION_ID, {
      type: 'basic',
      iconUrl: browser.extension.getURL('resources/icon_128x128.png'),
      title: fqdn,
      message: `${count} 人をフォローしました`,
    });
  }
}
