const fs = require('fs');

module.exports = data => new Promise((resolve, reject) => {
    fs.readFile(data.nteeFile, 'utf8', (error, nteeBody) => {
        if (error) {
            return reject({ ...data, error });
        }
        resolve({ ...data, nteeBody });
    });
});