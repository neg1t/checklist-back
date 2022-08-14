import { sequelize } from './index'
import { DataTypes, Optional, ModelDefined } from 'sequelize'
import { SubParagraph } from '@models/SubParagpraph';

type ChecklistParagraphType = {
  id: number
  checklistId: number
  title: string
}
export type ChecklistParagraphCreationAttributes = Optional<ChecklistParagraphType, 'id'>

export const ChecklistParagraph: ModelDefined<ChecklistParagraphType, ChecklistParagraphCreationAttributes> =
  sequelize.define(
    'checklist_paragraph',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      checklistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'checklist_paragraph',
      timestamps: false,
      underscored: true
    },
  )

ChecklistParagraph.hasMany(SubParagraph, {
  sourceKey: 'id',
  foreignKey: 'paragraphId',
  as: 'subParagraphs'
})