import { Destination } from './destination'
import { User } from '../user/user'
import { subYears } from 'date-fns'

/* test 1 */
describe('Dado una persona alemana y dos destinos que ninguno es su propio pais, uno local y otro no', () => {
  let //User
    usuarioAleman: User,
    //Destinations
    destinoArgentina: Destination, // Destino Local
    destinoItalia: Destination // Destino no Local

  beforeEach(() => {
    usuarioAleman = new User(
      'Roberto',
      'Alvarez',
      'robealvarez005',
      subYears(new Date(), 3),
      'Alemania'
    )
    //Destinations
    destinoArgentina = new Destination('Argentina', 'Buenos Aires', 30000) // Destino Local
    destinoItalia = new Destination('Italia', 'Roma', 30000) // Destino no Local
  })

  it('Si su destino es argentina entonces el costo sera el base, es decir $30000', () => {
    expect(destinoArgentina.totalCostFor(usuarioAleman)).toBe(30000)
  })

  it('Si su destino es Italia entonces el costo tendra un aumento del 20%, es decir $36000', () => {
    expect(destinoItalia.totalCostFor(usuarioAleman)).toBe(36000)
  })
})

/* test 2 */
describe('Test Destino Local', () => {
  let argentina: Destination // Destino Local
  let italia: Destination // Destino no Local
  beforeEach(() => {
    argentina = new Destination('Argentina', 'Buenos Aires', 30000)
    italia = new Destination('Italia', 'Roma', 30000)
  })

  it('Si el pais de destino es Argentina entonces el destino es local', () => {
    expect(argentina.isLocal()).toBe(true)
  })

  it('Si el pais de destino no es Argentina entonces el destino no es local', () => {
    expect(italia.isLocal()).toBe(false)
  })
})

/* test 3 */
describe('Test de validacion de destino', () => {
  let argentina: Destination,
    italia: Destination,
    chile: Destination,
    espania: Destination,
    brasil: Destination

  beforeEach(() => {
    argentina = new Destination('Argentina', 'Buenos Aires', 30000)
    italia = new Destination('Italia', 'Roma', 0)
    chile = new Destination('Chile', 'Santiago', -100)
    espania = new Destination('España', '', 15000)
    brasil = new Destination('', 'Brasilia', 20000)
  })

  it('Si el destino tiene pais, ciudad y costo base mayor a cero entonces es valido', () => {
    expect(argentina.isValid()).toBe(true)
  })
  it('Si el destino tiene un costo base igual a cero entonces es invalido', () => {
    expect(italia.isValid()).toBe(false)
  })
  it('Si el destino tiene un costo base menor a cero entonces es invalido', () => {
    expect(chile.isValid()).toBe(false)
  })
  it('Si el destino no tiene ciudad entonces es invalido', () => {
    expect(espania.isValid()).toBe(false)
  })
  it('Si el destino no tiene pais entonces es invalido', () => {
    expect(brasil.isValid()).toBe(false)
  })
})

// /* test 4 */
describe('Testeo de costos segun antigüedad', () => {
  let userA: User
  let userB: User
  let argentina: Destination // Destino Local
  let italia: Destination // Destino no Local

  beforeEach(() => {
    userA = new User(
      'Adrian',
      'Ibarra',
      'Adri97',
      subYears(new Date(), 16),
      'Italia'
    )
    userA.antiquity = 16

    userB = new User(
      'Jorge',
      'Ibarra',
      'Jor97',
      subYears(new Date(), 12),
      'Italia'
    )
    userB.antiquity = 12

    argentina = new Destination('Argentina', 'Buenos Aires', 25000)

    italia = new Destination('Italia', 'Roma', 30000)
  })

  it('Si el usuario no es del mismo pais que el destino.', () => {
    expect(argentina.totalCostFor(userA)).toBe(25000)
  })

  it('Si el usuario es del mismo pais que el destino y no supera los 15 años de antiguedad', () => {
    expect(italia.totalCostFor(userB)).toBe(32400)
  })

  it('Si el usuario es del mismo pais que el destino y supera los 15 años de antiguedad', () => {
    expect(italia.totalCostFor(userA)).toBe(31500)
  })
})
