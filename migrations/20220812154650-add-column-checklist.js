'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn('checklist', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'RESTRICT',
        references: {
          key: 'id',
          model: 'user',
        },
      })
      await queryInterface.addIndex('checklist', ['user_id'])
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw new Error(err)
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('checklist', 'user_id')
  },
}
