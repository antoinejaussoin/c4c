const download = require('download');
const fs = require('fs');
const path = require('path');
const pathExists = require('path-exists');

module.exports = (url, ein) => {
    console.log('Downloading: ', url);
    const directory = path.resolve(__dirname, 'data');
    const filename = ein+'.xml';
    const fullFileName = path.resolve(directory, filename);
    return pathExists(fullFileName)
    .then(exists => {
        if (!exists) {
            return download(url, directory, { filename })
                .then(() => fullFileName);
        }

        return fullFileName;
    });
};
