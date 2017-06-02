const { parseString } = require('xml2js');

module.exports = content => new Promise((resolve, reject) => {
    parseString(content, (err, result) => {
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
});