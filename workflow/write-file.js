const fs = require('fs');

module.exports = (fileName, content) => new Promise((resolve, reject) => {
    fs.writeFile(fileName, content, 'utf8', (err, result) => {
        if (err) {
            return reject(err);
        }
        resolve(content);
    });
});