type Status = {
    OK?: number
    CREATED?: number
    BAD_REQUEST?: number
    UNAUTHORIZED?: number
    NOT_FOUND?: number
}

export const STATUS: Status = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
}

export const ERROR: {[x in keyof Status]: string} = {
    BAD_REQUEST: 'Неверный запрос',
    UNAUTHORIZED: 'Пользователь не авторизован',
    NOT_FOUND: 'Не найдено'
}