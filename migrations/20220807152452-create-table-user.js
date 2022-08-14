'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'user',
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          first_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          last_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          patronymic: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          user_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: Sequelize.DATE,
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        { transaction },
      )

      await queryInterface.addIndex('user', ['first_name'], { transaction })
      await queryInterface.addIndex('user', ['last_name'], { transaction })
      await queryInterface.addIndex('user', ['user_name'], { transaction })
      await queryInterface.addIndex('user', ['email'], { transaction })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('User')
  },
}
