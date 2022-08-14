import express from 'express'
import { validate } from '@utils/expressValidator'
import { list } from './list'
import { create } from './create'
import { checklistCreationSchema } from './schemas'

const router = express.Router()

router.get('/list', list)
router.post('/', validate(checklistCreationSchema), create)

export default router
