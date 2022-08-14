import { expressjwt } from 'express-jwt'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { User, UserType } from '@models/User'

dotenv.config()

declare global {
  namespace Express {
    export interface Request {
      auth?: {
        id: number
        iat: number
        exp: number
        user?: UserType
      }
    }
  }
}

export const auth = [
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.auth?.id) {
      const user = await User.findByPk(req.auth.id, {
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
      }).then((user) => user.get({ plain: true }))
      req.auth.user = user
    }
    next()
  },
]
