import { Activity } from '../domain/activity/activity'
import { Difficulty } from '../domain/activity/difficulty'
import { ActivityFilter } from './activity-search.pipe'

describe('ActivityFilter', () => {
  const activities = [
    new Activity( 2000, "Senderismo / Trekking en Cerro Campanario", new Date (2022,4,5,9,0,0), new Date (2022,4,5,11,0,0), Difficulty.MEDIUM),
    new Activity( 16000, "Ruta de los 7 Lagos, Villa La Angostura - San Martin de los Andes", new Date (2022,4,5,8,0,0), new Date (2022,4,5,16,0,0), Difficulty.LOW),
    new Activity( 15000, "Circuito chico desde la rotonda Km 18 de Av. Exequiel Bustillo", new Date (2022,4,5,9,0,0), new Date (2022,4,5,10,0,0), Difficulty.LOW),
    new Activity( 22000, "Cerro Tronador y Glaciar Ventisquero Negro", new Date (2022,4,5,10,0,0), new Date (2022,4,5,13,50,0), Difficulty.HIGH),
    new Activity( 15000, "Cerveceria Patagonia", new Date (2022,4,5,9,0,0), new Date (2022,4,5,10,0,0), Difficulty.LOW)  
  ]

  it('create an instance', () => {
    const pipe = new ActivityFilter()
    expect(pipe).toBeTruthy()
  })

  it("Returns same collection of activities when no filter is applied", () => {
    const pipe = new ActivityFilter()
    const filteredActivities = pipe.transform(activities, "")
    expect(filteredActivities.length).toBe(5)
  })

  it("Filters by activity description", () => {
    const pipe = new ActivityFilter()
    const filteredActivities = pipe.transform(activities, "cerro")
    expect(filteredActivities.length).toBe(2)
    expect(filteredActivities[0].description).toBe("Senderismo / Trekking en Cerro Campanario")
    expect(filteredActivities[1].description).toBe("Cerro Tronador y Glaciar Ventisquero Negro")
  })

  it("Returns nothing when the filter finds no activity", () => {
    const pipe = new ActivityFilter()
    const filteredActivities = pipe.transform(activities, "3355345")
    expect(filteredActivities.length).toBe(0)
  })

})
