import 'module-alias/register'
import cors from 'cors'
import express, { Express, Request, Response, NextFunction } from 'express'
import config from '@config/index'
import router from './routes'
import fileUpload from 'express-fileupload'
import { errorHandler } from '@utils/error'
import { MulterFile } from '~types/files'

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({}))
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

router(app)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${config.port}`)
})
