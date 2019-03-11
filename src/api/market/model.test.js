import { Market } from '.'

let market

beforeEach(async () => {
  market = await Market.create({ name: 'test', product: 'test', latlong: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = market.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(market.id)
    expect(view.name).toBe(market.name)
    expect(view.product).toBe(market.product)
    expect(view.latlong).toBe(market.latlong)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = market.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(market.id)
    expect(view.name).toBe(market.name)
    expect(view.product).toBe(market.product)
    expect(view.latlong).toBe(market.latlong)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
