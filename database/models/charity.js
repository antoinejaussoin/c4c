import Sequelize from 'sequelize';

export default (sequelize) => sequelize.define('charity', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    EIN: Sequelize.STRING,
    DLN: Sequelize.STRING,
    activity: Sequelize.TEXT,
    mission: Sequelize.TEXT,
    formation: Sequelize.STRING,
    totalRevenue: Sequelize.DECIMAL(16, 2),
    nteeSubCategory: Sequelize.STRING,
    nteeCategoryName: Sequelize.STRING,
    nteeCharityName: Sequelize.STRING,
    nteeCity: Sequelize.STRING,
    nteeState: Sequelize.STRING,
    nteeRuleDate: Sequelize.INTEGER,
    nteeTaxPeriod: Sequelize.INTEGER,
    nteeIrsSubsection: Sequelize.STRING,
    nteeTotalRevenue: Sequelize.DECIMAL(16, 2),
    nteeTotalAssets: Sequelize.DECIMAL(16, 2)
});
