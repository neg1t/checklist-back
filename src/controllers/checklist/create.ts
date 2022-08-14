import { ChecklistRepository } from '@repositories/ChecklistRepository'
import { ChecklistService } from '@services/ChecklistService'
import { Result } from '@utils/result'
import {Request, Response, NextFunction} from 'express'
import { ChecklistCreation } from './schemas'

const checklistService = new ChecklistService({ checklistRepository: new ChecklistRepository() })

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = new Result()
        const body: ChecklistCreation = req.body
        const newChecklist = await checklistService.create(body, req.auth.user.id)
        result.setData(newChecklist)
        res.status(201).send(result)
    } catch(err) {
        next(err)
    }
}