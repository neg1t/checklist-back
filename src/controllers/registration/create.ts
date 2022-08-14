import { Request, Response, NextFunction } from 'express'
import { UserService } from '@services/UserService'
import { UserRepository } from '@repositories/UserRepository'
import { errorHandler } from '@utils/error'
import { ERROR } from '~types/constants'
import { Result } from '@utils/result'
import { MulterFile } from '../../types/files'
import { User } from '@models/User'
import { creationUserBody } from './schemas'

const userService = new UserService({ userRepository: new UserRepository() })

export const createController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: creationUserBody = req.body
    const newUser = await userService.create(body)
    const result = new Result(newUser)
    res.status(201).send(result)
  } catch (err) {
    next(err)
  }
}
