import { ChecklistCreation } from '@controllers/checklist/schemas'
import { ChecklistRepository } from '@repositories/ChecklistRepository'

type ChecklistConstructor = {
  checklistRepository: ChecklistRepository
}

export class ChecklistService {
  declare checklistRepository: ChecklistRepository

  constructor(params: ChecklistConstructor) {
    this.checklistRepository = params.checklistRepository
  }

  async list(userId: number) {
    return await this.checklistRepository.list(userId)
  }

  async create(body: ChecklistCreation, userId: number) {
    return await this.checklistRepository.create(body, userId)
  }
}
