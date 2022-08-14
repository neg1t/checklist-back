'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('checklist_paragraph', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        checklist_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'RESTRICT',
          references: {
            key: 'id',
            model: 'checklist',
          },
        },
        title: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      })
      await queryInterface.addIndex('checklist_paragraph', ['title'], { transaction })
      await queryInterface.addIndex('checklist_paragraph', ['checklist_id'], { transaction })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw new Error(err)
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('checklist_paragraph')
  },
}
