export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
      name: DataTypes.STRING(255),
      code: DataTypes.STRING(5)
  }, {
    classMethods: {
      associate: models => {
        // Category.hasMany(models.SubCategory, { as: 'subCategories' });
      }
    },
    tableName: 'category'
  });

  return Category;
};