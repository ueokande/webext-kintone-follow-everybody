export default class KintoneClient {
  constructor(token) {
    this.token = token;
  }

  get1000Users() {
    return this.post( '/k/api/group/users.json', {
      'id': '7532782697181632513',
      'size': 1000,
      'offset': 0,
    })
  }

  follow(uid) {
    return this.post( '/k/api/people/user/subscribe.json', {
      'userId': uid,
      'subscribe': true,
    })
  }

  async post(url, body) {
    let token = window.kintone.getRequestToken();
    let resp = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        '__REQUEST_TOKEN__': token,
        ...body,
      }),
    });
    if (resp.status >= 400) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  }
}
