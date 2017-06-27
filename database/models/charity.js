export default (sequelize, DataTypes) => {
  const Charity = sequelize.define('Charity', {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      ein: DataTypes.STRING,
      dln: DataTypes.STRING,
      activity: DataTypes.TEXT,
      mission: DataTypes.TEXT,
      formation: DataTypes.STRING
  }, {
    classMethods: {
      associate: models => {
        Charity.belongsTo(models.SubCategory, { as : 'subCategory' });
      }
    },
    tableName: 'charity'
  });

  return Charity;  
};