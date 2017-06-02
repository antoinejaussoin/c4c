const { parseString } = require('xml2js');

module.exports = data => new Promise((resolve, reject) => {
    parseString(data.xml, (error, json) => {
        if (error) {
            return reject(error);
        }
        resolve({ ...data, json });
    });
});