import { Request, Response, NextFunction } from 'express'
import { ChecklistService } from '@services/ChecklistService'
import { ChecklistRepository } from '@repositories/ChecklistRepository'
import { Result } from '@utils/result'

const checklistService = new ChecklistService({ checklistRepository: new ChecklistRepository() })

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await checklistService.list(req.auth.user.id)
    const result = new Result({ data: list })
    res.send(result)
  } catch (err) {
    next(err)
  }
}
