import { creationUserBody } from '@controllers/registration/schemas'
import { User } from '@models/User'
import bcrypt from 'bcryptjs'

export class UserRepository extends User {

  constructor() {
    super()
  }

  async create(body: creationUserBody): Promise<object> {
    try {
      const hash = bcrypt.hashSync(body.password, 10)
      const user = await User.create({
        ...body,
        password: hash,
      }).then((user) => user.get({ plain: true }))

      return {
        patronymic: user.patronymic,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}
