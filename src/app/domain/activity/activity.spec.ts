import { Activity } from './activity'
import { Difficulty } from './difficulty'

describe('Test de validacion de actividades', () => {
  const trekking = new Activity(
    500,
    'Trekking en sendero al lago',
    new Date(2022, 4, 5, 11, 0, 0),
    new Date(2022, 4, 5, 12, 0, 0),
    Difficulty.LOW
  )
  const rafting = new Activity(
    0,
    'Rafting en el rio',
    new Date(2022, 4, 5, 11, 0, 0),
    new Date(2022, 4, 5, 12, 0, 0),
    Difficulty.MEDIUM
  )
  const natacion = new Activity(
    -500,
    'Clase de natacion en el hotel',
    new Date(2022, 4, 5, 11, 0, 0),
    new Date(2022, 4, 5, 12, 0, 0),
    Difficulty.MEDIUM
  )
  const biciturismo = new Activity(
    500,
    '',
    new Date(2022, 4, 5, 11, 0, 0),
    new Date(2022, 4, 5, 12, 0, 0),
    Difficulty.HIGH
  )
  const escalada = new Activity(
    500,
    'Escalada de montaña',
    new Date(2022, 4, 5, 15, 0, 0),
    new Date(2022, 4, 5, 8, 0, 0),
    Difficulty.HIGH
  )
  const visitaBosque = new Activity(
    500,
    'Visita al bosque alto',
    new Date(2022, 4, 5, 13, 0, 0),
    new Date(2022, 4, 5, 13, 0, 0),
    Difficulty.LOW
  )

  it('Si la actividad tiene descripcion, dificultad, un costo mayor cero y el horario de inicio es menor al de fin entonces es valido', () => {
    expect(trekking.isValid()).toBe(true)
  })

  it('Si la actividad tiene todos los requisitos pero el costo es igual a cero entonces es valida', () => {
    expect(rafting.isValid()).toBe(true)
  })

  it('Si la actividad tiene un costo menor a cero entonces es invalida', () => {
    expect(natacion.isValid()).toBe(false)
  })

  it('Si la actividad no tiene descripcion entonces es invalida', () => {
    expect(biciturismo.isValid()).toBe(false)
  })

  it('Si la actividad tiene un horario de inicio mayor al de fin entonces es invalida', () => {
    expect(escalada.isValid()).toBe(false)
  })

  it('Si la actividad tiene un horario de inicio igual al de fin entonces es invalida', () => {
    expect(visitaBosque.isValid()).toBe(false)
  })
})

// describe(('Duracion de actividades'), () => {
//     const actividad = new Activity( 3000, "Football", new Date (2022, 4, 5, 11, 30, 0), new Date (2022, 4, 5, 13, 45, 0), Difficulty.LOW)

//     it(('Duracion calculada en minutos segun inicio y fin de actividad'), () => {
//         expect(actividad.durationInMinutes()).toBe(135)
//     })
// })
