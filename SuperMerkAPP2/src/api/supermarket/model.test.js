import { Supermarket } from '.'

let supermarket

beforeEach(async () => {
  supermarket = await Supermarket.create({ name: 'test', product: 'test', latlong: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = supermarket.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(supermarket.id)
    expect(view.name).toBe(supermarket.name)
    expect(view.product).toBe(supermarket.product)
    expect(view.latlong).toBe(supermarket.latlong)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = supermarket.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(supermarket.id)
    expect(view.name).toBe(supermarket.name)
    expect(view.product).toBe(supermarket.product)
    expect(view.latlong).toBe(supermarket.latlong)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
