import { sequelize } from './index'
import { DataTypes, ModelDefined } from 'sequelize'
import { User } from './User'

export type SubParagraphType = {
  paragraphId: number
  title: string
}

export const SubParagraph: ModelDefined<SubParagraphType, SubParagraphType> = sequelize.define(
  'sub_paragraph',
  {
    paragraphId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'sub_paragraph',
    timestamps: false,
    underscored: true
  },
)