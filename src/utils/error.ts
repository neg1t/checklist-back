import { Request, Response, NextFunction } from 'express'
import { ERROR } from '~types/constants'
import { Result } from './result'
import { STATUS } from '../types/constants'

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  let result = new Result()

  if (error.name === 'UnauthorizedError') {
    result.setError(ERROR.UNAUTHORIZED)
    return res.status(401).send(result)
  }

  switch (error.message) {
    case ERROR.NOT_FOUND:
        result.setError(ERROR.NOT_FOUND)
        return res.status(STATUS.NOT_FOUND).send(result)
    case ERROR.BAD_REQUEST:
        result.setError(ERROR.BAD_REQUEST)
        return res.status(STATUS.BAD_REQUEST).send(result)
    default:
        result.setError(ERROR.BAD_REQUEST)
        return res.status(STATUS.BAD_REQUEST).send(result)
  }
}