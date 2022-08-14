import { Sequelize } from 'sequelize'
import cfg from '@config/index'
import path from 'path'

const env = cfg.env || 'local'
const config = require(path.resolve(__dirname, "../config/sequelize-config.json"))[env]

const sequelize = new Sequelize(config)

export { sequelize, Sequelize }