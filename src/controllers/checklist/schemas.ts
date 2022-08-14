import { ChecklistCreationAttributes } from '@models/Checklist'
import { ChecklistParagraphCreationAttributes } from '@models/ChecklistParagraph'
import { SubParagraphType } from '@models/SubParagpraph'
import { validations } from '@utils/expressValidator'
import { body } from 'express-validator'

interface Paragraph extends ChecklistParagraphCreationAttributes {
  subParagraphs: SubParagraphType[]
}

export interface ChecklistCreation extends ChecklistCreationAttributes {
  paragraphs: Paragraph[]
}

export const checklistCreationSchema = [
  body('title')
    .notEmpty()
    .withMessage(validations.notEmptyField)
    .isString()
    .withMessage(validations.mustBeString),
  body('paragraphs').custom((paragraphs: Paragraph[]) => {
    if (Array.isArray(paragraphs)) {
      if (!paragraphs.length) {
        throw validations.notEmptyField
      }
      for (const paragraph of paragraphs) {
        if (!paragraph.title.length) {
          throw `paragraph.title ${validations.notEmptyField}`
        }
        if (paragraph.subParagraphs) {
          if (Array.isArray(paragraph.subParagraphs)) {
            if (!paragraph.subParagraphs.length) {
                throw `paragraph.subParagraphs ${validations.notEmptyField}`
            }
            for (const subParagraph of paragraph.subParagraphs) {
              if (!subParagraph.title.length) {
                throw `paragraph.subParagraph.title ${validations.notEmptyField}`
              }
            }
          } else {
            throw `paragraph.subParagraphs ${validations.mustBeArray}`
          }
        }
      }
    } else {
      throw validations.mustBeArray
    }
    return true
  }),
]
