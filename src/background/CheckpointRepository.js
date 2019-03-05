const CHECKPOINT_KEY_NAME = 'checkpoint';

export default class CheckpointRepository {
  async getLastUserId(fqdn) {
    let vals = await browser.storage.local.get(CHECKPOINT_KEY_NAME);
    if (!vals[CHECKPOINT_KEY_NAME]) {
      return undefined;
    }
    return vals[CHECKPOINT_KEY_NAME][fqdn];
  }

  async setLastUserId(fqdn, uid) {
    let vals = await browser.storage.local.get(CHECKPOINT_KEY_NAME);
    let checkpoints = vals[CHECKPOINT_KEY_NAME] || {};
    checkpoints[fqdn] = uid;
    return await browser.storage.local.set({ CHECKPOINT_KEY_NAME: checkpoints });
  }
}
