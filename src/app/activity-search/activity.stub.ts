import { Activity } from '../domain/activity/activity'
import { Difficulty } from '../domain/activity/difficulty'

export const activitiesStub = [
  new Activity(
    2000,
    'Senderismo / Trekking en Cerro Campanario',
    new Date(2022, 4, 5, 9, 0, 0),
    new Date(2022, 4, 5, 11, 0, 0),
    Difficulty.MEDIUM
  ),
  new Activity(
    16000,
    'Ruta de los 7 Lagos, Villa La Angostura - San Martin de los Andes',
    new Date(2022, 4, 5, 8, 0, 0),
    new Date(2022, 4, 5, 16, 0, 0),
    Difficulty.LOW
  ),
  new Activity(
    15000,
    'Circuito chico desde la rotonda Km 18 de Av. Exequiel Bustillo',
    new Date(2022, 4, 5, 9, 0, 0),
    new Date(2022, 4, 5, 10, 0, 0),
    Difficulty.LOW
  )
].map((activity) => activity.toJSON())
