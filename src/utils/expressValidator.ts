import { validationResult, ValidationChain } from 'express-validator'
import { NextFunction, Request, Response } from 'express'


export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        return res.status(400).json({
            errors: errors.array()
        })
    }
}
export const validations = {
    userNameAlreadyExist: 'Пользователь с таким логином уже есть',
    emailAlreadyExist: 'Пользователь с таким email уже есть',
    notEmptyField: 'Поле не должно быть пустым',
    passwordInvalid: 'Пароль некорректен',
    emailInvalid: 'email некорректен',
    userNotFound: 'Пользователь не найден',
    loginInvalid: 'Неверная пара логин/пароль',
    mustBeArray: 'Должен быть массив',
    mustBeString: 'Должен быть string'
}