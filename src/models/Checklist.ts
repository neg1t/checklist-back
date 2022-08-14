import { sequelize } from './index'
import { DataTypes, Optional, ModelDefined } from 'sequelize'
import { ChecklistParagraph } from '@models/ChecklistParagraph';

type ChecklistType = {
  id: number
  title: string
  sharedAccess: boolean
  userId: string
  createdAt?: Date
  updatedAt?: Date
}
export type ChecklistCreationAttributes = Optional<ChecklistType, 'id' | 'sharedAccess'>

export const Checklist: ModelDefined<ChecklistType, ChecklistCreationAttributes> = sequelize.define(
  'checklist',
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sharedAccess: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
  },
  {
    tableName: 'checklist',
    underscored: true
  },
)

Checklist.hasMany(ChecklistParagraph, {
  foreignKey: 'checklistId',
  sourceKey: 'id',
  as: 'paragraphs',
})