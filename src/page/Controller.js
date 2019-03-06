import KintoneClient from './KintoneClient';

export default class Controller {
  constructor() {
    this.kintoneClient = new KintoneClient();
  }

  async getAllUsers() {
    let result = await this.kintoneClient.get1000Users();
    return result.entities.map(e => ({ id: e.id, name: e.name}))
  }

  async follow(uid) {
    let result = await this.kintoneClient.get1000Users();
    return
  }
}
