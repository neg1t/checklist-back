import { Application } from 'express'
import { auth } from '@utils/auth'
import registration from '@controllers/registration'
import authtorization from './auth'
import checklist from './checklist'

export default (app: Application) => {
  app.use('/registration', registration)
  app.use('/auth', authtorization)
  app.use('/checklist', auth, checklist)
}
