import { Application } from 'express'
import mainRouter from '@controllers/index'

export default (app: Application) => {
    mainRouter(app)
}