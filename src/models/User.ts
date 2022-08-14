import { sequelize } from './index'
import {
  DataTypes,
  Optional,
  ModelDefined,
} from 'sequelize'

export type UserType = {
  id?: number
  firstName: string
  lastName: string
  patronymic?: string
  userName: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

type UserCreationAttributes = Optional<UserType, 'id'>

export const User: ModelDefined<UserType, UserCreationAttributes> = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
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
    tableName: 'user',
    underscored: true
  },
)
User.create