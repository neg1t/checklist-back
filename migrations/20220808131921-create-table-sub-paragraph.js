'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('sub_paragraph', {
        paragraph_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'RESTRICT',
          references: {
            key: 'id',
            model: 'checklist_paragraph',
          },
        },
        title: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      })
      await queryInterface.addIndex('sub_paragraph', ['paragraph_id'], { transaction })
      await queryInterface.addIndex('sub_paragraph', ['title'], { transaction })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw new Error(err)
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('sub_paragraph')
  },
}
