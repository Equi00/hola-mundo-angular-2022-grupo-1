import { ItineraryFilter } from './main.pipe'

describe('MainPipe', () => {
  it('create an instance', () => {
    const pipe = new ItineraryFilter()
    expect(pipe).toBeTruthy()
  })
})
