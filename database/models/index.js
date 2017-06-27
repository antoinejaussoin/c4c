import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../../database.json';
const db = {};

const prodConfig = config.production;

db.init = function () {

    var sequelize = new Sequelize(prodConfig.database, prodConfig.user, prodConfig.password, prodConfig);

    fs
        .readdirSync(__dirname)
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js') && file !== 'utils';
        })
        .forEach(function (file) {
            var model = sequelize['import'](path.join(__dirname, file));
            console.log('model: ', model.name);
            db[model.name] = model;
        });

    Object.keys(db).forEach(function (modelName) {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
};

db.Sequelize = Sequelize;

module.exports = db;