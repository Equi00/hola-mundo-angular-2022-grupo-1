import { User } from './user'

const userStub = new User(
  'Nicolas',
  'Villamonte',
  'nicovillamonte',
  new Date(),
  'Argentina'
)
userStub.id = 0
userStub.email = 'nicovillamonte@gmail.com'
userStub.antiquity = 5
userStub.travelDays = 10

export default userStub
