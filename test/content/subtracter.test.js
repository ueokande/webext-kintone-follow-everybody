import Subtracter from '../../src/content/subtracter'

describe('Subtracter', () => {
  it('subtracts a number', () => {
    let subtracter = new Subtracter();
    expect(subtracter.sub(10, 20)).to.equal(-10)
  })
})
