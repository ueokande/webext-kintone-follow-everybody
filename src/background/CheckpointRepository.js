const CHECKPOINT_KEY_NAME = 'checkpoint';

export default class CheckpointRepository {
  async getCheckpoint(fqdn) {
    let vals = await browser.storage.local.get(CHECKPOINT_KEY_NAME);
    if (!vals[CHECKPOINT_KEY_NAME]) {
      return undefined;
    }
    return vals[CHECKPOINT_KEY_NAME][fqdn];
  }

  async setCheckpoint(fqdn, uid) {
    let checkpoint = {
      lastUserId: uid,
      updatedAt: new Date(),
    }
    let vals = await browser.storage.local.get(CHECKPOINT_KEY_NAME);
    let checkpoints = vals[CHECKPOINT_KEY_NAME] || {};
    checkpoints[fqdn] = checkpoint;
    return await browser.storage.local.set({ CHECKPOINT_KEY_NAME: checkpoints });
  }
}
