const download = require('download');
const fs = require('fs');
const path = require('path');
const pathExists = require('path-exists');

module.exports = (url, ein) => () => {
    console.log('Downloading: ', url);
    const directory = path.resolve(__dirname, 'data');
    const filename = ein+'.xml';
    return pathExists(path.resolve(directory, filename))
    .then(exists => {
        if (!exists) {
            return download(url, directory, { filename });
        }
    });
};
