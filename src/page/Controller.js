import KintoneClient from './KintoneClient';

export default class Controller {
  constructor({
    kintoneClient = new KintoneClient()
  } = {}) {
    this.kintoneClient = kintoneClient;
  }

  async getAllUsers() {
    let { result } = await this.kintoneClient.get1000Users();
    return result.entities.map(e => ({ id: e.id, name: e.name }));
  }

  getLoginUser() {
    let user = window.kintone.getLoginUser();
    return Promise.resolve({ id: user.id, name: user.name });
  }


  async follow(uid) {
    await this.kintoneClient.follow(uid);
  }
}
