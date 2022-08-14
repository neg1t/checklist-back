import { creationUserBody } from '@controllers/registration/schemas'
import { UserRepository } from '@repositories/UserRepository'

type UserConstructor = {
  userRepository: UserRepository
}

export class UserService {
  declare userRepository: UserRepository

  constructor(params: UserConstructor) {
    this.userRepository = params.userRepository
  }

  async create(body: creationUserBody) {
    const result = await this.userRepository.create(body)
    return result
  }
}
