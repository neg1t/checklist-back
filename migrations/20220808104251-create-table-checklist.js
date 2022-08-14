'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'checklist',
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          shared_access: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        transaction,
      )
      await queryInterface.addIndex('checklist', ['title'], { transaction })
      await queryInterface.addIndex('checklist', ['shared_access'], { transaction })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw new Error(err)
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('checklist')
  },
}
