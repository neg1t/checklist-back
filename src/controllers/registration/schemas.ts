import { body } from 'express-validator'
import { User } from '@models/User'
import { validations } from '@utils/expressValidator'

export type creationUserBody = {
    userName: string
    email: string
    lastName: string
    firstName: string
    password: string
    patronymic?: string
}

export const userCreationSchema = [
    body('email').notEmpty().withMessage(validations.notEmptyField).isEmail().withMessage(validations.emailInvalid).custom(async email => {
        return await User.findAll({
            where: {
                email
            }
        }).then(user => {
            if (user.length) {
                throw validations.emailAlreadyExist
            }
        })
    }),
    body('userName').notEmpty().withMessage(validations.notEmptyField).custom(async userName => {
        return await User.findAll({
            where: {
                userName
            }
        }).then(user => {
            if (user.length) {
                throw validations.userNameAlreadyExist
            }
        })
    }),
    body('password').notEmpty().withMessage(validations.notEmptyField),
    body('lastName').notEmpty().withMessage(validations.notEmptyField),
    body('firstName').notEmpty().withMessage(validations.notEmptyField)
]
