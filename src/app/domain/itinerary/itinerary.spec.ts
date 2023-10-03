import { Itinerary } from './itinerary'
import { Destination } from '../destination/destination'
import { User } from '../user/user'
import { Activity } from '../activity/activity'
import { ItineraryDay } from './itineraryDay'
import { Difficulty } from '../activity/difficulty'
import { subYears } from 'date-fns'

// Itinerario varidaciones

describe('Test de validacion de itinerario', () => {
  let //Destino
    argentina: Destination,
    //Actividades
    trekking: Activity,
    caminata: Activity,
    carrera: Activity,
    //Usuarios
    moncho: User,
    esteban: User,
    micaela: User,
    //Itinerarios
    itinerario: Itinerary,
    diaItinerario: ItineraryDay,
    itinerario2: Itinerary,
    itinerario3: Itinerary,
    diaItinerario3: ItineraryDay

  beforeEach(() => {
    //Destino
    argentina = new Destination('Argentina', 'Buenos Aires', 30000)

    //Actividades
    trekking = new Activity(
      500,
      'Trekking en sendero al lago',
      new Date(2022, 4, 5, 11, 0, 0),
      new Date(2022, 4, 5, 12, 0, 0),
      Difficulty.LOW
    )

    caminata = new Activity(
      500,
      'Caminata por el bosque',
      new Date(2022, 4, 5, 14, 0, 0),
      new Date(2022, 4, 5, 15, 0, 0),
      Difficulty.LOW
    )

    carrera = new Activity(
      500,
      'Carrera en autopista',
      new Date(2022, 4, 5, 14, 20, 0),
      new Date(2022, 4, 5, 14, 30, 0),
      Difficulty.LOW
    )

    //Usuarios
    moncho = new User(
      'Moncho',
      'Criollo',
      'Chicho',
      subYears(new Date(), 5),
      'Afganistan'
    )
    moncho.id = 0

    esteban = new User(
      'Esteban',
      'Kotillo',
      'Est321',
      subYears(new Date(), 5),
      'Argentina'
    )
    esteban.id = 1

    micaela = new User(
      'Micaela',
      'Zosa',
      'Miki',
      subYears(new Date(), 3),
      'China'
    )
    micaela.id = 2

    //Itinerarios
    itinerario = new Itinerary(esteban, argentina)
    diaItinerario = new ItineraryDay()
    itinerario2 = new Itinerary(esteban, argentina)
    itinerario3 = new Itinerary(esteban, argentina)
    diaItinerario3 = new ItineraryDay()

    //Setters
    moncho.addDesiredDestination(argentina)
    esteban.addDesiredDestination(argentina)
    esteban.travelDays = 5
    micaela.addDesiredDestination(argentina)
    diaItinerario.addActivities([trekking, caminata])
    itinerario.addDay(diaItinerario)
    diaItinerario3.addActivities([trekking, caminata, carrera])
    itinerario3.addDay(diaItinerario3)
  })

  it('Si el itinerario tiene creador, destino, 1 o mas dias con actividades, las actividades del dia no se solapan, puntuaciones del 1 al 10 de distintos usuarios entonces es valida', () => {
    moncho.addVisitDestination(argentina)
    micaela.addVisitDestination(argentina)
    moncho.rateItinerary(itinerario, 9)
    micaela.rateItinerary(itinerario, 5)
    expect(itinerario.isValid()).toBe(true)
  })

  it('Si el itinerario no tiene dias con actividades entonces no es valido', () => {
    expect(itinerario2.isValid()).toBe(false)
  })

  it('Si el itinerario tiene actividades del dia que se solapan entonces no es valido', () => {
    expect(itinerario3.isValid()).toBe(false)
  })

  it('Si el itinerario tiene mas de una puntuacion de un mismo usuario entonces no es valido', () => {
    moncho.addVisitDestination(argentina)
    moncho.rateItinerary(itinerario, 9)
    moncho.rateItinerary(itinerario, 5)
    expect(itinerario.isValid()).toBe(false)
  })

  it('Si el itinerario tiene alguna puntuacion menor a 1 entonces no es valido', () => {
    moncho.addVisitDestination(argentina)
    moncho.rateItinerary(itinerario, 0)
    expect(itinerario.isValid()).toBe(false)
  })

  it('Si el itinerario tiene alguna puntuacion mayor a 10 entonces no es valido', () => {
    moncho.addVisitDestination(argentina)
    moncho.rateItinerary(itinerario, 20)
    expect(itinerario.isValid()).toBe(false)
  })
})

describe('Tests de dificultad del itinerario', () => {
  //Activities
  let activity1: Activity,
    activity2: Activity,
    activity3: Activity,
    activity4: Activity,
    activity5: Activity,
    activity6: Activity,
    //Aux user
    raul: User,
    //List
    activities1: Array<Activity>,
    activities2: Array<Activity>,
    //Destination
    destination1: Destination,
    destination2: Destination,
    //Itineraries
    itinerary1: Itinerary,
    dayOfItinerary1: ItineraryDay,
    itinerary2: Itinerary,
    dayOfItinerary2: ItineraryDay

  beforeEach(() => {
    activity1 = new Activity(
      3000,
      'Futbol',
      new Date(2022, 4, 5, 8, 30, 0),
      new Date(2022, 4, 5, 10, 30, 0),
      Difficulty.LOW
    )

    activity2 = new Activity(
      3000,
      'Tennis',
      new Date(2022, 4, 5, 11, 0, 0),
      new Date(2022, 4, 5, 13, 0, 0),
      Difficulty.MEDIUM
    )

    activity3 = new Activity(
      3000,
      'Calistenia',
      new Date(2022, 4, 6, 8, 0, 0),
      new Date(2022, 4, 6, 10, 0, 0),
      Difficulty.MEDIUM
    )

    activity4 = new Activity(
      3000,
      'Boxeo',
      new Date(2022, 4, 6, 12, 30, 0),
      new Date(2022, 4, 6, 14, 0, 0),
      Difficulty.HIGH
    )

    activity5 = new Activity(
      3000,
      'Voley',
      new Date(2022, 4, 6, 15, 0, 0),
      new Date(2022, 4, 6, 17, 0, 0),
      Difficulty.HIGH
    )

    activity6 = new Activity(
      3000,
      'Calistenia',
      new Date(2022, 4, 7, 10, 30, 0),
      new Date(2022, 4, 7, 12, 30, 0),
      Difficulty.MEDIUM
    )

    //Aux user
    raul = new User(
      'Raul',
      'Mendez',
      'raulmendez',
      subYears(new Date(), 3),
      'Argentina'
    )
    //List
    activities1 = [
      activity1,
      activity2,
      activity3,
      activity4,
      activity5,
      activity6
    ]
    activities2 = [activity1, activity2]

    //Destination
    destination1 = new Destination('Argentina', 'Buenos Aires', 3000)
    destination2 = new Destination('Italia', 'Roma', 10000)

    //Itineraries
    itinerary1 = new Itinerary(raul, destination1)
    dayOfItinerary1 = new ItineraryDay()
    itinerary2 = new Itinerary(raul, destination2)
    dayOfItinerary2 = new ItineraryDay()
  })

  //Tests
  it('El itinerario tiene más actividades nivel medio', () => {
    //Act
    itinerary1.addDay(dayOfItinerary1)
    dayOfItinerary1.addActivities(activities1)
    itinerary1.addEmptyDays(3)
    //Arrange
    expect(itinerary1.difficulty()).toBe(Difficulty.MEDIUM)
  })

  it('El itinerario tiene cantidad igual de actividades de nivel bajo y nivel medio', () => {
    //Act
    itinerary2.addDay(dayOfItinerary2)
    dayOfItinerary2.addActivities(activities2)
    itinerary2.addEmptyDays(4)
    //Arrange
    expect(itinerary2.difficulty()).toBe(Difficulty.MEDIUM)
  })
})

describe('Test Edicion de itinerarios', () => {
  let argentina: Destination, pedro: User, juan: User, itinerario: Itinerary

  beforeEach(() => {
    // Destinos:
    argentina = new Destination('Argentina', 'CABA', 30000)

    // Usuarios:
    pedro = new User(
      'Pedro',
      'Martinez',
      'PeMartin',
      subYears(new Date(), 12),
      'Uruguay'
    )
    pedro.id = 0

    juan = new User(
      'Juan',
      'Fernandez',
      'Ferna123',
      subYears(new Date(), 12),
      'Argentina'
    )
    juan.id = 1

    // Itinerarios:
    itinerario = new Itinerary(juan, argentina)
    itinerario.addEmptyDays(4)
  })

  it('Usuario puede editar itinerario porque es el creador.', () => {
    expect(juan.canEditItinerary(itinerario)).toBe(true)
  })

  it('Usuario no puede editar el itinerario porque aunque es amigo del creador, no conoce el destino.', () => {
    // ACT:
    juan.addFriend(pedro)
    // ASSERT:
    expect(pedro.canEditItinerary(itinerario)).toBe(false)
  })

  it('Usuario puede editar el itinerario porque es amigo del creador y conoce el destino.', () => {
    // ACT:
    juan.addFriend(pedro)
    pedro.addVisitDestination(argentina)
    // ASSERT:
    expect(pedro.canEditItinerary(itinerario)).toBe(true)
  })

  it('Usuario no puede editar el itinerario porque no es amigo del creador.', () => {
    pedro.addVisitDestination(argentina)
    // ASSERT:
    expect(pedro.canEditItinerary(itinerario)).toBe(false)
  })
})
