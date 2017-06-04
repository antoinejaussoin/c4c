import Sequelize from 'sequelize';

export default (sequelize) => sequelize.define('charity', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    EIN: Sequelize.STRING,
    DLN: Sequelize.STRING,
    activity: Sequelize.STRING,
    mission: Sequelize.STRING,
    formation: Sequelize.STRING,
    totalRevenue: Sequelize.DECIMAL(10, 2)
});
