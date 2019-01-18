import Addr from '../../src/background/addr'

describe('Addr', () => {
  it('adds a number', () => {
    let addr = new Addr();
    expect(addr.add(10, 20)).to.equal(30);
  })
})
