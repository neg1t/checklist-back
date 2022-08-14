import { ChecklistCreation } from '@controllers/checklist/schemas'
import { Checklist } from '@models/Checklist'
import { ChecklistParagraph } from '@models/ChecklistParagraph'
import { SubParagraph } from '@models/SubParagpraph'

export class ChecklistRepository extends Checklist {
  constructor() {
    super()
  }

  async list(userId: number) {
    const list = await Checklist.findAll({
      where: {
        userId,
      },
      include: [
        {
          as: 'paragraphs',
          model: ChecklistParagraph,
          attributes: { exclude: ['checklistId'] },
          include: [
            {
              as: 'subParagraphs',
              model: SubParagraph,
              attributes: { exclude: ['paragraphId'] },
            },
          ],
        },
      ],
    }).then((checklists) => checklists.map((checklist) => checklist?.get({ plain: true })))
    return list
  }

  async create(body: ChecklistCreation, userId: number) {
    const transaction = await this.sequelize.transaction()
    try {
      const newChecklist = await Checklist.create(
        {
          title: body.title,
        },
        { transaction },
      ).then((checklist) => checklist.get({ plain: true }))

      for (const paragraph of body.paragraphs) {
        const newParagraph = await ChecklistParagraph.create(
          {
            checklistId: newChecklist.id,
            title: paragraph.title,
          },
          { transaction },
        ).then((paragraph) => paragraph.get({ plain: true }))
        for (const subParagraph of paragraph.subParagraphs) {
          await SubParagraph.create(
            {
              title: subParagraph.title,
              paragraphId: newParagraph.id,
            },
            { transaction },
          )
        }
      }
      await transaction.commit()

      return newChecklist
    } catch (err) {
      await transaction.rollback()
      throw new Error(err)
    }
  }
}
