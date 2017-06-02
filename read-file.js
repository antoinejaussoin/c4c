const fs = require('fs');

module.exports = fileName => new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, result) => {
        if (err) {
            return reject(err);
        }
        console.log('file read: ', fileName);
        resolve(result);
    });
});