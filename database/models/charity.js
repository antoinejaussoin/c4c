import Sequelize from 'sequelize';

export default (sequelize) => sequelize.define('charity', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    EIN: Sequelize.STRING,
    DLN: Sequelize.STRING,
    activity: Sequelize.TEXT,
    mission: Sequelize.TEXT,
    formation: Sequelize.STRING,
    totalRevenue: Sequelize.DECIMAL(16, 2)
});
