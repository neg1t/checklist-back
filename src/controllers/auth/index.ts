import { User, UserType } from '@models/User'
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'
import { Result } from '@utils/result'
import { validations } from '@utils/expressValidator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body
    const result = new Result()
    const user: UserType = await User.findOne({
      where: {
        [Op.or]: [{ userName: username }, { email: username }],
      },
    }).then((user) => user?.get({ plain: true }))

    if (!user?.email) {
      result.setError(validations.userNotFound)
      return res.status(401).send(result)
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
      result.setData({
        lastName: user.lastName,
        firstName: user.firstName,
        patronymic: user?.patronymic,
        email: user.email,
        token,
      })
    } else {
        result.setError(validations.loginInvalid)
        return res.status(401).send(result)
    }
    res.send(result)
  } catch (err) {
    next(err)
  }
})

export default router
