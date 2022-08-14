import express from 'express'
import { createController } from './create'
import { userCreationSchema } from './schemas'
import { validate } from '@utils/expressValidator'

const router = express.Router()

router.post('/', validate(userCreationSchema), createController)

export default router
