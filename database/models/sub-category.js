export default (sequelize, DataTypes) => {
  const SubCategory = sequelize.define('SubCategory', {
      name: DataTypes.STRING(255),
      code: DataTypes.STRING(5)
  }, {
    classMethods: {
      associate: models => {
        SubCategory.belongsTo(models.Category, { as : 'category' });
        // SubCategory.hasMany(models.Charity, { as : 'charities' });
      }
    },
    tableName: 'subcategory'
  });

  return SubCategory;
};
