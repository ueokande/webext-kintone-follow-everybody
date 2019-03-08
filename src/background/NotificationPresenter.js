export default class NotificationPresenter {
  notifyFollowed(fqdn, count) {
    return browser.notifications.create({
      type: 'basic',
      string: fqdn,
      message: '${count} 人をフォローしました',
    });
  }
}
