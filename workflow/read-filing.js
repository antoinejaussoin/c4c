const fs = require('fs');

module.exports = data => new Promise((resolve, reject) => {
    fs.readFile(data.filingFile, 'utf8', (error, xml) => {
        if (error) {
            return reject({ ...data, error });
        }
        resolve({ ...data, xml });
    });
});